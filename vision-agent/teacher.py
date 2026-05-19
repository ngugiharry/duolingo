import logging
import os
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


def get_system_instruction():
    """Generate the system instruction for the language teacher."""
    teacher_language = os.getenv("TEACHER_LANGUAGE", "en")
    student_language = os.getenv("STUDENT_LANGUAGE", "es")

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

        # Initialize OpenAI Realtime LLM
        logger.info("Initializing OpenAI Realtime...")
        openai_client = OpenAI(api_key=openai_api_key)
        llm = Realtime(
            client=openai_client,
            model="gpt-4-realtime-preview",
            instructions=get_system_instruction(),
            modalities=["text", "audio"],
        )

        # Create the Agent
        logger.info("Creating Language Teacher Agent...")
        agent = Agent(
            edge=edge,
            agent_user={
                "id": "language-teacher",
                "name": "AI Language Teacher",
            },
            instructions=get_system_instruction(),
            llm=llm,
        )

        logger.info("=" * 60)
        logger.info("Language Teacher Agent started successfully!")
        logger.info("=" * 60)
        logger.info(f"Teacher Language: {os.getenv('TEACHER_LANGUAGE', 'en')}")
        logger.info(f"Student Language: {os.getenv('STUDENT_LANGUAGE', 'es')}")
        logger.info("Waiting for incoming calls...")
        logger.info("=" * 60)

        # Run the agent
        await agent.run()

    except Exception as e:
        logger.error(f"Failed to start Language Teacher Agent: {e}")
        raise


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
