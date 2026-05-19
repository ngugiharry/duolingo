#!/usr/bin/env python3
"""Startup script for the Language Teacher Agent."""
import sys
import asyncio
import logging
from config import TeacherConfig
from teacher import main

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def main_startup():
    """Start the Language Teacher Agent."""
    logger.info("=" * 70)
    logger.info("Language Teacher Agent - Startup")
    logger.info("=" * 70)

    try:
        # Load and validate configuration
        config = TeacherConfig()
        config.validate()

        logger.info("Configuration loaded successfully:")
        for key, value in config.log_config().items():
            logger.info(f"  {key}: {value}")

        # Run the agent
        logger.info("=" * 70)
        asyncio.run(main())

    except ValueError as e:
        logger.error(f"Configuration error: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        logger.info("\nShutting down Language Teacher Agent...")
        sys.exit(0)
    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main_startup()
