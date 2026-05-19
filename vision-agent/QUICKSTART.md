# Quick Start Guide - Language Teacher Agent

## 5-Minute Setup

### 1. Install Dependencies

```bash
cd vision-agent
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add:
# - STREAM_API_KEY (from parent .env.local)
# - STREAM_API_SECRET (from parent .env.local)
# - OPENAI_API_KEY (get from https://platform.openai.com/api-keys)
```

### 3. Verify Installation

```bash
python verify.py
```

You should see:

- ✓ vision_agents installed
- ✓ Agent class available
- ✓ Realtime LLM class available
- ✓ Stream Edge available
- ✓ OpenAI client available
- ✓ All environment variables set

### 4. Start the Agent

```bash
python run.py
```

Expected output:

```
=== Language Teacher Agent - Startup ===
Configuration loaded successfully:
  teacher_language: en
  student_language: es
  llm_model: gpt-4-realtime-preview
  ...
=== Language Teacher Agent - Initializing ===
Connecting to Stream Edge...
Initializing OpenAI Realtime...
Creating Language Teacher Agent...
Language Teacher Agent started successfully!
Waiting for incoming calls...
```

## Lifecycle Overview

The agent follows this lifecycle:

1. **Initialization Phase**
   - Stream Edge connects
   - OpenAI Realtime initializes
   - Agent starts listening

2. **Active Phase**
   - Student connects via mobile app
   - Audio streams through Stream Edge
   - Agent processes and responds
   - Conversation continues

3. **Termination Phase**
   - Call ends
   - Resources cleaned up
   - Agent returns to listening state

## Key Methods Used

From Vision Agents SDK:

- `Agent.run()` - Start listening for calls
- `Agent.__init__()` - Initialize with edge, agent_user, instructions, llm
- Event handling via Stream Edge integration

From OpenAI Realtime:

- `Realtime()` - Initialize LLM with streaming capabilities
- Automatic speech-to-text, response generation, and text-to-speech

From Stream Edge:

- `Edge()` - Initialize real-time connection
- Automatic audio streaming and call lifecycle management

## Troubleshooting

### "ModuleNotFoundError: No module named 'vision_agents'"

```bash
pip install -r requirements.txt
```

### "Missing required API credentials"

Check your `.env` file:

```bash
cat .env
echo "STREAM_API_KEY = $STREAM_API_KEY"
echo "OPENAI_API_KEY = $OPENAI_API_KEY"
```

### "Connection refused" or timeout errors

- Verify STREAM_API_KEY and STREAM_API_SECRET are valid
- Check internet connectivity
- Ensure no firewall is blocking the connection

### Agent starts but no audio comes through

- Check that OPENAI_API_KEY has Realtime API access
- Verify mobile app is connecting to the correct Stream environment
- Check Stream console for connection errors

## Integration with Mobile App

The mobile app will:

1. Request a language lesson
2. Get a Stream token for secure connection
3. Connect to this agent via Stream Edge
4. Stream audio in real-time
5. Receive audio responses from the agent

See the parent Duolingo app for mobile client integration.

## Advanced Configuration

Edit `.env` for tuning:

```env
# More creative responses
LLM_TEMPERATURE=0.9

# Faster/slower audio processing
LLM_FPS=15

# Different model
LLM_MODEL=gpt-4-turbo

# Teach German instead
STUDENT_LANGUAGE=de

# Student speaks French, teacher responds in German
TEACHER_LANGUAGE=de
```

## Files Reference

| File               | Purpose                   |
| ------------------ | ------------------------- |
| `teacher.py`       | Main agent implementation |
| `config.py`        | Configuration management  |
| `run.py`           | Entry point script        |
| `verify.py`        | Installation verification |
| `requirements.txt` | Python dependencies       |
| `.env.example`     | Environment template      |
| `README.md`        | Full documentation        |
| `QUICKSTART.md`    | This file                 |

## Next Steps

1. ✓ Install dependencies
2. ✓ Configure environment variables
3. ✓ Run `python verify.py` to confirm setup
4. ✓ Start with `python run.py`
5. Connect via mobile app to test
6. Monitor logs for debugging

## Support

For issues:

1. Run `python verify.py` - check all dependencies
2. Check `.env` file - verify all keys are set
3. Review logs - look for specific error messages
4. See README.md - full documentation
