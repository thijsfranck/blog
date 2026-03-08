---
date: 2026-03-08
categories:
    - Software Development
    - DevOps
    - Large Language Models
---

# Setting up a Local First AI Developer Environment

I recently explored running Large Language Models (LLMs) locally to enhance my development workflow. While I'm
currently using GitHub Copilot, my goal was to find a solution that balances privacy, low latency, large context
windows, and seamless integration with my development workflow.

This post shares my personal experience setting up [LM Studio](https://lmstudio.ai) as the local LLM server and
configuring [Roo Code](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline) for agentic
workflows and [Continue.dev](https://marketplace.visualstudio.com/items?itemName=Continue.continue) for editor
autocomplete in a VSCode devcontainers environment.

## Why Local LLMs for My Workflow?

Before diving into the setup, let me share why I pursued local LLMs in the first place. For my development needs,
three benefits stood out as particularly important:

- **Privacy**: Your code never leaves your machine. This is crucial when working with proprietary codebases or
  sensitive projects where you cannot risk sending code to external APIs.

- **Latency**: No network round-trip delays for inference means faster responses when asking questions or getting
  suggestions. The difference becomes noticeable when you're in a flow state and waiting for AI assistance.

- **Larger Context Windows**: When working with large projects, the ability to provide more context to the mode
  is invaluable. Local setups allow for larger context windows than many cloud-based solutions, enabling better
  understanding of your entire codebase structure.

## Model Selection

I tested several models before settling on two that work well for different purposes:

### Agentic Workflows

This larger model handles complex reasoning tasks, code generation, and detailed explanations. The [`Qwen3.5-35B`](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct)
model is a good choice here. Its size provides good quality for a variety of tasks while remaining manageable
on consumer hardware.

### Autocomplete

For tab-autocomplete, I needed something faster that could provide quick suggestions without interrupting my workflow
The [`Qwen2.5-Coder-7B`](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct) model strikes the right balance
between speed and suggestion quality.

!!! QUESTION "Why Qwen Models?"

    I chose Qwen models because they offer excellent code understanding capabilities, good multilingual support, and
    perform well with GGUF quantization format used by LM Studio. The models are also Apache 2.0 licensed, making them
    accessible for personal and commercial use.

## LLM Server Setup

After evaluating several options, I chose [LM Studio](https://lmstudio.ai) as my local LLM server. Here's why
it worked well for me:

- **Straightforward UI**: The interface is intuitive and easy to navigate
- **Easy model downloads**: Built-in browsing makes discovering and downloading models simple
- **Visual model management**: See available models, their sizes, and compatibility at a glance
- **REST API server mode**: Provides the backend that VSCode extensions can connect to

### Enabling the Server

The only tricky part I encountered was enabling the server. It's controlled by a small toggle switch in the UI
that can be easy to miss:

1. Open LM Studio and navigate to the **Local Server** tab
2. Toggle **"Start Local Server"** ON (small toggle at the top of the page)
3. Once enabled, LM Studio runs locally on port 1234 by default, ready to accept connections from your VSCode
   extensions

### Network Configuration for DevContainers

When using devcontainers, the easiest way I've found to connect to LM Studio is to serve it on the local network.
In LM Server settings, enable **"Serve on Local Network"**. LM Studio will then be accessible at `http://<your-machine-ip>:1234`.

!!! WARNING "Network Security"

    I realize exposing LM Studio to the network might raise security concerns, so I'd be open to other suggestions
    for strictly local access!

## VSCode Extensions

After trying out different combinations to see what works best for me, I settled on using **two extensions**,
each serving a specific purpose in my workflow:

### Agentic Workflows

For agentic workflows I landed on the [Roo Code](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline)
extension. It provides an excellent UX for for complex workflows with strong capabilities for codebase reasoning
and task execution, making it an excellent choice for complex coding tasks requiring multi-step planning.

Unfortunately, Roo Code does not support autocomplete, so I needed an alternative for that.

### Autocomplete

For autocomplete I chose the [Continue.dev](https://marketplace.visualstudio.com/items?itemName=Continue.continue)
extension. The extension integrates well with the editor, although the experience is not as seemless as GitHub
Copilot. I may still keep on the lookout for a better alternative.

## DevContainers Integration

I installed **both extensions inside the devcontainer** rather than on the host. Extensions running inside the
container have direct access to the filesystem, improving file read/write operations for agentic workflows.

## Conclusion

My recommended setup for developers who want both agentic capabilities and autocomplete support is:

- **Server**: [LM Studio](https://lmstudio.ai)
- **Agentic Extension**: [Roo Code](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline)
- **Autocomplete Extension**: [Continue.dev](https://marketplace.visualstudio.com/items?itemName=Continue.continue)
- **Models**: [`Qwen3.5-35B`](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct) for agentic
  tasks, [`Qwen2.5-Coder-7B`](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct) for autocomplete

This configuration is ideal if you:

- Prefer to work in a local first development environment
- Need to keep code local for privacy reasons
- Work with large projects requiring larger context windows
- Want both agentic capabilities and inline autocomplete

---

_Happy coding! If you've tried a similar setup, I'd love to hear about your experiences._
