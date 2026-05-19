#!/usr/bin/env python3
"""
Verification script to check Vision Agents SDK installation and method signatures.
"""
import sys
import inspect
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def verify_sdk_installation():
    """Verify Vision Agents SDK is installed and check method signatures."""
    logger.info("=" * 70)
    logger.info("Vision Agents SDK Verification")
    logger.info("=" * 70)

    all_ok = True

    # Check vision_agents import
    try:
        import vision_agents

        version = (
            vision_agents.__version__
            if hasattr(vision_agents, "__version__")
            else "version unknown"
        )
        logger.info(f"✓ vision_agents installed: {version}")
    except ImportError as e:
        logger.error(f"✗ vision_agents not installed: {e}")
        logger.info("Install with: pip install -r requirements.txt")
        all_ok = False

    # Check Agent class and core methods
    try:
        from vision_agents import Agent

        logger.info("✓ Agent class available")

        # Check for key methods
        expected_methods = ["run", "send_message", "send_audio"]
        found_methods = []

        for method_name in expected_methods:
            if hasattr(Agent, method_name):
                found_methods.append(method_name)
                method = getattr(Agent, method_name)
                sig = inspect.signature(method) if callable(method) else "N/A"
                logger.info(f"  ✓ {method_name}{sig}")

        if not found_methods:
            logger.warning("  ⚠ Could not verify expected methods")

    except ImportError as e:
        logger.error(f"✗ Could not import Agent: {e}")
        all_ok = False

    # Check Realtime LLM
    try:
        from vision_agents.realtime import Realtime

        logger.info("✓ Realtime LLM class available")
    except ImportError:
        try:
            from vision_agents import Realtime

            logger.info("✓ Realtime LLM class available (alternate import)")
        except ImportError as e:
            logger.warning(f"⚠ Realtime class not found: {e}")

    # Check Stream Edge
    try:
        from getstream import Edge

        logger.info("✓ Stream Edge available (getstream.Edge)")
    except ImportError:
        try:
            from stream import Edge

            logger.info("✓ Stream Edge available (stream.Edge)")
        except ImportError as e:
            logger.warning(f"⚠ Stream Edge not found: {e}")
            all_ok = False

    # Check OpenAI client
    try:
        from openai import OpenAI

        logger.info("✓ OpenAI client available")
    except ImportError as e:
        logger.error(f"✗ OpenAI client not available: {e}")
        logger.info("Install with: pip install openai")
        all_ok = False

    # Check environment variables
    logger.info("\n" + "=" * 70)
    logger.info("Environment Configuration Check")
    logger.info("=" * 70)

    import os
    from dotenv import load_dotenv

    load_dotenv()

    required_vars = ["STREAM_API_KEY", "STREAM_API_SECRET", "OPENAI_API_KEY"]
    optional_vars = ["TEACHER_LANGUAGE", "STUDENT_LANGUAGE", "LLM_MODEL"]

    for var in required_vars:
        value = os.getenv(var)
        if value:
            masked = value[:4] + "..." + value[-4:] if len(value) > 8 else "***"
            logger.info(f"✓ {var}: {masked}")
        else:
            logger.warning(f"✗ {var}: not set")
            all_ok = False

    logger.info("\nOptional configuration:")
    for var in optional_vars:
        value = os.getenv(var)
        if value:
            logger.info(f"✓ {var}: {value}")
        else:
            logger.info(f"  {var}: (using default)")

    if not all_ok:
        logger.warning("\n⚠ Some dependencies or configuration missing")
        logger.info("Create .env file with required variables (see .env.example)")

    # Check if we can instantiate config
    logger.info("\n" + "=" * 70)
    logger.info("Configuration Validation")
    logger.info("=" * 70)

    try:
        from config import TeacherConfig

        config = TeacherConfig()
        logger.info("✓ TeacherConfig created successfully")
        logger.info(f"  Teacher language: {config.teacher_language}")
        logger.info(f"  Student language: {config.student_language}")
    except Exception as e:
        logger.error(f"✗ Could not create configuration: {e}")
        all_ok = False

    logger.info("\n" + "=" * 70)
    logger.info("Verification Complete")
    logger.info("=" * 70)

    if all_ok:
        logger.info("✓ All systems ready!")
        logger.info("Start with: python run.py")
    else:
        logger.warning("⚠ Please fix issues above before running the agent")

    return all_ok


if __name__ == "__main__":
    success = verify_sdk_installation()
    sys.exit(0 if success else 1)
