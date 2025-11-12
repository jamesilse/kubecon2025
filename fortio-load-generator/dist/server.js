import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { allTools } from './tools.js';
export async function createServer() {
    const server = new Server({
        name: 'fortio-load-generator',
        version: '0.1.0',
    }, {
        capabilities: {
            tools: {},
        },
    });
    // List tools
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: allTools.map(tool => ({
                name: tool.name,
                description: tool.description,
                inputSchema: zodToJsonSchema(tool.inputSchema, { strictUnions: true }),
            })),
        };
    });
    // Call tool
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        const tool = allTools.find(t => t.name === name);
        if (!tool) {
            return {
                content: [{ type: 'text', text: `Tool ${name} not found` }],
                isError: true,
            };
        }
        try {
            const result = await tool.handler((args || {}));
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(result, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
    return server;
}
// For development with HTTP transport
export async function createHttpServer() {
    const server = await createServer();
    // Simple health check via a custom tool
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: [
                {
                    name: 'health',
                    description: 'Health check',
                    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
                },
                ...allTools.map(tool => ({
                    name: tool.name,
                    description: tool.description,
                    inputSchema: zodToJsonSchema(tool.inputSchema, { strictUnions: true }),
                })),
            ],
        };
    });
    return server;
}
//# sourceMappingURL=server.js.map