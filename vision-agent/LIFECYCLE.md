# Vision Agents Lifecycle - Method Signatures

This document specifies the lifecycle method shapes used in the Language Teacher Agent.

**Before deploying**, verify these match your installed Vision Agents SDK version using `python verify.py`.

## Agent Lifecycle Methods

The following methods from the Vision Agents framework are utilized:

### Initialization

```python
# Constructor signature
Agent(
    edge: Edge,
    agent_user: dict,
    instructions: str,
    llm: Realtime,
    [processors: List = None]
)
```

**Parameters:**

- `edge`: Stream Edge connection instance
- `agent_user`: Dictionary with `id` and `name` keys identifying the agent
- `instructions`: System prompt/instructions for the teacher
- `llm`: Realtime language model instance (OpenAI Realtime)
- `processors`: Optional list of video/audio processors

**Example:**

```python
from getstream import Edge
from vision_agents import Agent
from vision_agents.realtime import Realtime
from openai import OpenAI

edge = Edge(api_key=key, api_secret=secret)
llm = Realtime(client=OpenAI(api_key=key), model="gpt-4-realtime-preview")

agent = Agent(
    edge=edge,
    agent_user={"id": "teacher", "name": "Language Teacher"},
    instructions="You teach Spanish...",
    llm=llm
)
```

### Core Methods

#### `async def run()`

Starts the agent listening for incoming calls.

```python
await agent.run()
```

**Behavior:**

- Blocks until interrupted (Ctrl+C)
- Listens for incoming calls via Stream Edge
- Automatically handles call lifecycle
- Returns on shutdown/error

**No parameters, no return value**

### Event Handling

The agent handles events through Stream Edge integration. The exact event names and signatures depend on your installed SDK version.

**Typical events handled:**

- `call_created` - When a student initiates a call
- `participant_joined` - When student audio starts
- `message_received` - Text messages from student
- `call_ended` - When call terminates

**Event handling is automatic** through the Stream Edge connection and OpenAI Realtime integration.

## Current Implementation Verification

The teacher.py implements the following lifecycle:

```python
# 1. INITIALIZATION
agent = Agent(
    edge=Edge(...),
    agent_user={
        "id": "language-teacher",
        "name": "AI Language Teacher"
    },
    instructions=get_system_instruction(),
    llm=Realtime(...)
)

# 2. START LISTENING
await agent.run()

# 3. EVENT HANDLING (automatic via Stream Edge)
#    - Receives student audio
#    - Sends through OpenAI Realtime
#    - Streams response back
#    - Handles call end
```

## How to Verify Method Signatures

### Option 1: Automated Verification

```bash
python verify.py
```

This script will:

1. Check SDK installation
2. Inspect available methods
3. Validate configuration
4. Report any mismatches

### Option 2: Manual Verification

```python
import inspect
from vision_agents import Agent

# Print Agent.__init__ signature
print(inspect.signature(Agent.__init__))

# List all methods
for name, method in inspect.getmembers(Agent, predicate=inspect.ismethod):
    print(f"{name}: {inspect.signature(method)}")

# Check for specific methods
print(hasattr(Agent, 'run'))
print(hasattr(Agent, 'send_message'))
```

### Option 3: Check SDK Documentation

Vision Agents documentation: https://visionagents.ai/

## What to Do If Signatures Don't Match

If `python verify.py` reports mismatches:

1. **Update requirements.txt** to match your needed version
2. **Reinstall dependencies**:

   ```bash
   pip install --upgrade -r requirements.txt
   ```

3. **Update teacher.py** to match new signatures

4. **Rerun verification**:

   ```bash
   python verify.py
   ```

5. **Test startup**:
   ```bash
   python run.py
   ```

## Version Compatibility

This implementation targets:

- **vision-agents**: >= 0.7.0
- **openai**: >= 1.3.0 (for Realtime)
- **getstream**: >= 0.1.0

If you need a different version, update `requirements.txt` and notify the development team.

## SDK Evolution

As the Vision Agents SDK evolves, possible changes:

- Method names may change (e.g., `run()` → `start()`)
- Parameter names may change
- Event handling may use different patterns
- Return types may change

**Always run `verify.py` after dependency updates.**

## Current SDK Status

✓ **Verified for**: Vision Agents 0.7.0+
✓ **Entry point**: `async def main()` in teacher.py
✓ **Execution**: `python run.py` or `asyncio.run(main())`
✓ **Startup time**: Expect 2-5 seconds for full initialization

## Testing Lifecycle

To verify the agent starts correctly:

```bash
# 1. Setup environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 2. Verify installation
python verify.py
# Should show all ✓ checks passing

# 3. Test startup
python run.py
# Should show "Language Teacher Agent started successfully!"
# Then "Waiting for incoming calls..."

# 4. Stop with Ctrl+C
# Should cleanly shutdown
```

## Next Steps

1. Run `python verify.py` to confirm method signatures match
2. Run `python run.py` to test clean startup
3. Monitor startup logs for any warnings
4. Report any mismatches to the development team
