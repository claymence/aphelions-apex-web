---
name: mcp-usage
description: How to use specific MCP servers
compatibility: opencode
metadata:
    audience: developer
    workflow: full stack, backend
---

# MCP Usage Guide

## Postman Remote MCP

### Key Functions

Use Postman MCP to fetch API collections, requests, and responses.

#### **Common Tools**

- `postman-remote-mcp_getCollection` - Fetch collection metadata
- `postman-remote-mcp_getCollections` - List all collections in workspace
- `postman-remote-mcp_createCollectionRequest` - Create new request
- `postman-remote-mcp_getEnvironment` - Get environment variables
- `postman-remote-mcp_runCollection` - Execute collection tests

#### **Example Workflow**

```
1. List collections: getCollections({ workspace: "..." })
2. Get collection: getCollection({ collectionId: "..." })
3. Run tests: runCollection({ collectionId: "..." })
```

### **When to Use**

- **API Testing**: Run collection tests against endpoints
- **Environment Management**: Fetch/update environment variables
- **Request Management**: Create or inspect API requests

---

## Svelte Remote MCP

### Key Functions

Svelte MCP provides framework-specific tools for Svelte 5 and SvelteKit.

#### **Common Tools**

- `svelte-remote-mcp_list-sections` - List all available documentation sections
- `svelte-remote-mcp_get-documentation` - Fetch specific documentation (e.g., "$state", "routing")
- `svelte-remote-mcp_svelte-autofixer` - Fix Svelte component issues
- `svelte-remote-mcp_playground-link` - Generate playground link for component

#### **Example Workflow**

```
1. List sections: list-sections()
2. Get docs: get-documentation({ section: ["$state", "load functions"] })
3. Fix code: svelte-autofixer({ code: "...", desired_svelte_version: 5 })
```

### **When to Use**

- **Documentation Lookup**: Fetch Svelte/SvelteKit docs without leaving context
- **Code Validation**: Auto-fix component syntax issues
- **Playground Testing**: Generate shareable Svelte playground links

---

## Agent Guidance

### **For Postman MCP**

**Prompt Example:**

> "Run the JWST API tests and show results"

**Expected Actions:**

1. Use `getCollections({ workspace: "..." })` to find collection
2. Use `runCollection({ collectionId: "..." })` to execute
3. Parse test results and report

### **For Svelte MCP**

**Prompt Example:**

> "How do I use $state in Svelte 5?"

**Expected Actions:**

1. Use `list-sections()` to find relevant section
2. Use `get-documentation({ section: "$state" })`
3. Return docs + example code

**Prompt Example:**

> "Fix this Svelte component: [code]"

**Expected Actions:**

1. Use `svelte-autofixer({ code: "...", desired_svelte_version: 5 })`
2. Return fixed code
