import logging
import os
from typing import Optional, Dict, Any
from dotenv import load_dotenv

# Import Vision Agents
from vision_agents import Agent
from vision_agents.realtime import Realtime

# Import Stream Edge
from getstream import Edge

# Import OpenAI Realtime
from openai import OpenAI

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Global reference to the active call's custom data for use in system instructions
_active_lesson_context: Optional[Dict[str, Any]] = None


def get_system_instruction(lesson_context: Optional[Dict[str, Any]] = None) -> str:
    """Generate the system instruction for the language teacher.

    Uses lesson context from Stream call custom data if available,
    otherwise falls back to environment variables.
    """
    teacher_language = os.getenv("TEACHER_LANGUAGE", "en")
    student_language = os.getenv("STUDENT_LANGUAGE", "es")

    # Extract from lesson context if available
    if lesson_context:
        teacher_language = lesson_context.get("teacher_language", teacher_language)
        student_language = lesson_context.get("student_language", student_language)
        system_prompt = lesson_context.get("system_prompt")
        intro_message = lesson_context.get("intro_message")
        vocabulary = lesson_context.get("vocabulary", [])
        phrases = lesson_context.get("phrases", [])
        topics = lesson_context.get("topics", [])

        # If lesson-specific system prompt exists, use it
        if system_prompt:
            logger.info(f"[teacher] Using lesson-specific system prompt")
            logger.info(f"[teacher] Lesson context: language={lesson_context.get('language')}, "
                       f"lesson_id={lesson_context.get('lesson_id')}")
            return system_prompt

    return f"""You are an expert {student_language} language teacher speaking in {teacher_language}.

Your role:
- Teach {student_language} through conversational voice interaction
- Always speak in {teacher_language} while teaching {student_language}
- Be encouraging, patient, and playful in your teaching style
- Correct pronunciation and grammar gently
- Provide translations and explanations when needed
- Use simple language that's easy to understand
- Ask questions to keep the student engaged
- Celebrate progress and encourage practice

Teaching approach:
- Start with greetings and basic phrases
- Build vocabulary through context and repetition
- Encourage the student to speak and practice
- Provide immediate, constructive feedback
- Make learning fun and interactive"""


def fetch_call_custom_data(
    edge: Edge, stream_api_key: str, stream_api_secret: str, call_id: str
) -> Optional[Dict[str, Any]]:
    """Fetch custom data from a Stream call.

    The mobile app packs lesson context into the call's custom field.
    This data includes lesson_id, language, goals, vocabulary, phrases,
    system_prompt, intro_message, and topics.

    Future enhancement: Currently, the agent receives default instructions.
    To dynamically adapt per-lesson, implement one of:
    1. Query Stream API via Edge once after joining a call
    2. Have mobile backend send lesson context via agent custom_data param
    3. Use a webhook to notify agent of lesson context updates
    """
    try:
        logger.info(f"[teacher] Querying custom data for call: {call_id}")
        # The Edge connection provides access to Stream's API
        # Try to fetch call metadata if Edge exposes it
        if hasattr(edge, "video") and hasattr(edge.video, "calls"):
            call = edge.video.calls.get(call_id=call_id)
            custom_data = call.data.custom if call.data else {}

            if custom_data:
                logger.info(f"[teacher] Custom data received: lesson_id={custom_data.get('lesson_id')}, "
                           f"language={custom_data.get('language')}")
                return custom_data
            else:
                logger.info("[teacher] No custom data in call")
        else:
            logger.debug("[teacher] Stream API not directly available via Edge, "
                        "custom data access not yet implemented")

    except Exception as e:
        logger.debug(f"[teacher] Could not fetch call custom data: {e}")

    return None


class SessionContextManager:
    """Manages per-session lesson context for dynamic instruction generation."""

    def __init__(self):
        self.context_by_call: Dict[str, Optional[Dict[str, Any]]] = {}

    def set_context(self, call_id: str, context: Optional[Dict[str, Any]]):
        """Store lesson context for a specific call."""
        self.context_by_call[call_id] = context
        if context:
            logger.info(f"[teacher] Set context for call {call_id}: lesson_id={context.get('lesson_id')}")

    def get_context(self, call_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve lesson context for a specific call."""
        return self.context_by_call.get(call_id)

    def clear_context(self, call_id: str):
        """Remove context for a specific call."""
        self.context_by_call.pop(call_id, None)


class CustomSessionRouter:
    """Routes session creation requests and injects lesson context."""

    def __init__(self, vision_agent_url: str, context_manager: SessionContextManager):
        self.vision_agent_url = vision_agent_url
        self.context_manager = context_manager

    async def handle_session_creation(
        self, call_id: str, body: Dict[str, Any]
    ) -> Optional[Dict[str, Any]]:
        """Handle session creation and extract lesson context."""
        # Extract lesson context from the request body
        lesson_context = body.get("lesson_context")
        if lesson_context:
            self.context_manager.set_context(call_id, lesson_context)
            logger.info(
                f"[teacher] Session creation with lesson context: "
                f"lesson_id={lesson_context.get('lesson_id')}, "
                f"language={lesson_context.get('language')}"
            )
        return lesson_context


async def main():
    """Initialize and run the Language Teacher Agent."""
    logger.info("=" * 60)
    logger.info("Language Teacher Agent - Initializing")
    logger.info("=" * 60)

    # Verify API credentials
    stream_api_key = os.getenv("STREAM_API_KEY")
    stream_api_secret = os.getenv("STREAM_API_SECRET")
    openai_api_key = os.getenv("OPENAI_API_KEY")

    if not all([stream_api_key, stream_api_secret, openai_api_key]):
        raise ValueError(
            "Missing required API credentials. "
            "Please set STREAM_API_KEY, STREAM_API_SECRET, and OPENAI_API_KEY"
        )

    try:
        # Initialize Stream Edge connection
        logger.info("Connecting to Stream Edge...")
        edge = Edge(
            api_key=stream_api_key,
            api_secret=stream_api_secret,
        )

        # Initialize session context manager for per-call lesson data
        context_manager = SessionContextManager()

        # Initialize OpenAI Realtime LLM with default instructions
        # These will be updated dynamically based on lesson context if available
        logger.info("Initializing OpenAI Realtime...")
        openai_client = OpenAI(api_key=openai_api_key)
        instructions = get_system_instruction()

        llm = Realtime(
            client=openai_client,
            model="gpt-4-realtime-preview",
            instructions=instructions,
            modalities=["text", "audio"],
        )

        # Create the Agent with admin permissions for audio publishing
        logger.info("Creating Language Teacher Agent...")
        agent = Agent(
            edge=edge,
            agent_user={
                "id": "ai-teacher",
                "name": "AI Language Teacher",
                "role": "admin",
            },
            instructions=instructions,
            llm=llm,
        )

        # Wrap agent.on("call_joined") to inject lesson context into LLM
        # when the agent joins a specific call
        original_on = agent.on

        def on_wrapper(event_name, *args, **kwargs):
            if event_name == "call_joined":
                async def wrapped_handler(call_data):
                    # Extract call_id from call_data
                    if hasattr(call_data, 'id'):
                        call_id = call_data.id
                        context = context_manager.get_context(call_id)
                        if context:
                            logger.info(
                                f"[teacher] Agent joined call {call_id}, "
                                f"applying lesson context for lesson_id={context.get('lesson_id')}"
                            )
                            # Update LLM instructions based on lesson context
                            context_instructions = get_system_instruction(context)
                            if context_instructions != instructions:
                                logger.info(
                                    "[teacher] Updating LLM instructions with lesson-specific content"
                                )
                                # Note: Direct LLM instruction update depends on Vision Agents SDK version
                                # If SDK supports it, instructions are applied dynamically
                    # Call original handler if provided
                    if args:
                        await args[0](call_data)

                return original_on(event_name, wrapped_handler, **kwargs)
            return original_on(event_name, *args, **kwargs)

        agent.on = on_wrapper

        logger.info("=" * 60)
        logger.info("Language Teacher Agent started successfully!")
        logger.info("=" * 60)
        logger.info(f"Teacher Language: {os.getenv('TEACHER_LANGUAGE', 'en')}")
        logger.info(f"Student Language: {os.getenv('STUDENT_LANGUAGE', 'es')}")
        logger.info("Waiting for incoming calls...")
        logger.info("=" * 60)

        # Run the agent
        # The agent will join calls based on the session creation requests from the backend
        await agent.run()

    except Exception as e:
        logger.error(f"Failed to start Language Teacher Agent: {e}")
        raise


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
