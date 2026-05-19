# Language Teacher Agent

An AI-powered voice language teacher using Stream Vision Agents, OpenAI Realtime, and Stream Edge for real-time communication.

## Overview

The Language Teacher Agent is a voice-only AI tutor that:

- Teaches students a selected language (e.g., Spanish, French, German)
- Communicates entirely in voice using Stream Edge transport
- Leverages OpenAI Realtime for natural, low-latency conversations
- Uses System prompts to maintain consistent teaching style
- Scales through Stream's infrastructure

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Mobile App (React Native/Expo - Duolingo)             │
│  - Initiates language lesson call                       │
│  - Streams audio input from student                     │
├─────────────────────────────────────────────────────────┤
│  Stream Edge (Real-time Transport)                      │
│  - Handles voice streaming                              │
│  - Manages call lifecycle                               │
├─────────────────────────────────────────────────────────┤
│  Language Teacher Agent (Python Service)               │
│  - Processes student audio                              │
│  - Generates teaching responses                         │
│  - Stream Edge integration                              │
├─────────────────────────────────────────────────────────┤
│  OpenAI Realtime API                                    │
│  - Speech-to-text transcription                         │
│  - LLM-based teaching response generation               │
│  - Text-to-speech voice synthesis                       │
└─────────────────────────────────────────────────────────┘
```

## Setup

### Prerequisites

- Python 3.10+
- Poetry or pip + venv
- API keys for:
  - Stream (API Key + Secret)
  - OpenAI (for Realtime API access)

### Installation

1. **Create virtual environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your API credentials:
   # - STREAM_API_KEY
   # - STREAM_API_SECRET
   # - OPENAI_API_KEY
   # - TEACHER_LANGUAGE (default: en)
   # - STUDENT_LANGUAGE (default: es)
   ```

### Environment Variables

```env
# Stream API credentials (from parent .env)
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# OpenAI API key (required for Realtime)
OPENAI_API_KEY=your_openai_api_key

# Teacher configuration
TEACHER_LANGUAGE=en              # Language the teacher speaks
STUDENT_LANGUAGE=es              # Language being taught
LLM_MODEL=gpt-4-realtime-preview # OpenAI model
LLM_TEMPERATURE=0.7              # Response creativity (0-1)
LLM_FPS=10                        # Frames per second for audio
```

## Running the Agent

### Basic startup:

```bash
python run.py
```

### Verification:

First, verify the SDK installation:

```bash
python verify.py
```

This will check:

- Vision Agents SDK installation
- OpenAI client availability
- Stream SDK availability
- Environment configuration

## Implementation Details

### Key Components

1. **teacher.py** - Main agent implementation
   - `get_system_instruction()` - Generates the teaching prompt
   - `main()` - Initializes and runs the agent
   - Integration with Stream Edge and OpenAI Realtime

2. **config.py** - Configuration management
   - `TeacherConfig` dataclass for centralized settings
   - Validation of required credentials
   - Logging-friendly configuration display

3. **run.py** - Startup entry point
   - Configuration loading and validation
   - Graceful error handling
   - Signal handling (Ctrl+C)

4. **verify.py** - Verification utility
   - SDK installation checks
   - Method signature inspection
   - Environment configuration validation

## Lifecycle & Event Handling

The agent follows the Vision Agents framework lifecycle:

1. **Initialization**: Stream Edge connection, OpenAI Realtime setup
2. **Running**: Agent listens for incoming calls
3. **Call Lifecycle**:
   - Student initiates a language lesson call
   - Agent receives audio stream via Stream Edge
   - OpenAI Realtime processes audio and generates response
   - Agent sends audio response back through Stream Edge
4. **Termination**: Call ends, resources cleaned up

## Example Interaction Flow

```
Student: "Hola, ¿cómo estás?" (via voice)
  ↓
Stream Edge: Delivers audio to agent
  ↓
Vision Agent:
  - Receives audio from Stream Edge
  - Sends to OpenAI Realtime for processing
  - Realtime model:
    - Transcribes student speech
    - Generates teaching response in system language
    - Synthesizes response to speech
  ↓
Stream Edge: Delivers audio response to student
  ↓
Student: Hears correction and teaching in English
```

## Configuration Examples

### Teaching Spanish to English speakers:

```env
TEACHER_LANGUAGE=en
STUDENT_LANGUAGE=es
```

### Teaching French to English speakers:

```env
TEACHER_LANGUAGE=en
STUDENT_LANGUAGE=fr
```

### Teaching German to Spanish speakers:

```env
TEACHER_LANGUAGE=es
STUDENT_LANGUAGE=de
```

## Troubleshooting

### Missing API credentials

```
ValueError: Missing required API credentials
```

**Solution**: Verify .env file has STREAM_API_KEY, STREAM_API_SECRET, and OPENAI_API_KEY

### SDK not installed

```
ModuleNotFoundError: No module named 'vision_agents'
```

**Solution**: Run `pip install -r requirements.txt`

### Agent fails to start

1. Run `python verify.py` to check configuration
2. Check logs for specific error messages
3. Verify API credentials are valid

## Development

### Project Structure

```
vision-agent/
├── teacher.py          # Main agent implementation
├── config.py           # Configuration management
├── run.py              # Startup entry point
├── verify.py           # Verification utility
├── requirements.txt    # Python dependencies
├── .env.example        # Environment template
└── README.md           # This file
```

### Testing

To test the agent setup without making live calls:

```bash
# Verify installation
python verify.py

# This will show:
# - SDK versions
# - Available lifecycle methods
# - Environment configuration
```

## Integration with Mobile App

The mobile app connects to this agent through Stream:

1. App requests a language lesson call
2. Stream handles connection negotiation
3. Agent receives call notification
4. Bidirectional audio streaming begins
5. Agent processes and responds in real-time

See the parent Duolingo app for mobile integration details.

## Performance Considerations

- **Latency**: OpenAI Realtime provides <500ms RTT typically
- **Concurrency**: Handled by Stream infrastructure (can handle many concurrent calls)
- **Costs**: Based on OpenAI Realtime usage and Stream compute

## License

Part of the Duolingo AI Learning Project
