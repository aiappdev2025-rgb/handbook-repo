---
part: 0
part_name: "Operating"
chapter: 17
title: "MCP Tools and Integration"
slug: "17-mcp-tools-and-integration"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 17. MCP Tools and Integration

In this chapter, you'll learn about Model Context Protocol (MCP) and how it extends Claude Code's capabilities. MCP enables connections to external services like databases, APIs, and memory systems. By the end of this chapter, you'll know how to set up and use MCP servers.

## 17.1 MCP Capabilities

Model Context Protocol (MCP) enables Claude Code to connect to external services and tools:

| Capability | Example MCP Servers | Use Cases |
| --- | --- | --- |
| Memory persistence | Memory MCP, ByteRover | Cross-session knowledge retention |
| External APIs | GitHub MCP, Stripe MCP | Query repos, manage payments |
| Databases | Postgres MCP, Supabase MCP | Direct database operations |
| Web search | Brave Search MCP | Current information lookup |

## 17.2 Setting Up MCP

Configure MCP servers in your Claude Code configuration file:

```text
# ~/.claude/mcp_servers.json
{
  "servers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-memory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    }
  }
}
```

> **Expected Outcome**
>
> **What you should have:** Understanding of MCP capabilities (memory, APIs, databases, search) and how to configure servers.
>
> **How to validate:** You can add a new MCP server to your configuration file.
>
> **Next:** Chapter 18 — Learn memory persistence strategies beyond MCP.

## Chapter 17 Summary

- MCP connects Claude Code to external services and tools
- Common capabilities: memory persistence, APIs, databases, web search
- Configure in ~/.claude/mcp_servers.json
- Each server needs a command and optional environment variables

---
