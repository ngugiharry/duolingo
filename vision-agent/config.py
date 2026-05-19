"""Configuration for the Language Teacher Agent."""
import os
from dataclasses import dataclass
from dotenv import load_dotenv


load_dotenv()


@dataclass
class TeacherConfig:
    """Configuration for the language teacher."""

    # Stream API credentials
    stream_api_key: str = os.getenv("STREAM_API_KEY", "")
    stream_api_secret: str = os.getenv("STREAM_API_SECRET", "")

    # OpenAI API key
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")

    # Teacher configuration
    teacher_language: str = os.getenv("TEACHER_LANGUAGE", "en")
    student_language: str = os.getenv("STUDENT_LANGUAGE", "es")

    # LLM configuration
    llm_model: str = os.getenv("LLM_MODEL", "gpt-4-realtime-preview")
    llm_temperature: float = float(os.getenv("LLM_TEMPERATURE", "0.7"))
    llm_fps: int = int(os.getenv("LLM_FPS", "10"))

    # Agent configuration
    agent_name: str = "Language Teacher"
    agent_id: str = "language-teacher"

    def validate(self) -> bool:
        """Validate that all required configuration is present."""
        required = [
            ("STREAM_API_KEY", self.stream_api_key),
            ("STREAM_API_SECRET", self.stream_api_secret),
            ("OPENAI_API_KEY", self.openai_api_key),
        ]

        missing = [name for name, value in required if not value]

        if missing:
            raise ValueError(
                f"Missing required configuration: {', '.join(missing)}. "
                "Please set these environment variables or create a .env file."
            )

        return True

    def log_config(self):
        """Log the configuration (without sensitive data)."""
        return {
            "teacher_language": self.teacher_language,
            "student_language": self.student_language,
            "llm_model": self.llm_model,
            "llm_temperature": self.llm_temperature,
            "llm_fps": self.llm_fps,
            "agent_name": self.agent_name,
        }
