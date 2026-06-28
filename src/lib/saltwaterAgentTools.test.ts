import { describe, expect, it } from 'vitest';
import { SALTWATER_AGENT_TOOLS } from '@/lib/saltwaterAgentTools';

type ToolEntry = {
  type: string;
  function: {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: unknown;
      required: unknown;
    };
  };
};

describe('SALTWATER_AGENT_TOOLS', () => {
  it('exposes exactly six OpenAI-shaped function tools with unique names and valid JSON Schema parameters', () => {
    const tools = SALTWATER_AGENT_TOOLS as ReadonlyArray<ToolEntry>;
    expect(tools).toHaveLength(6);

    const names = tools.map((tool) => tool.function.name);
    expect(new Set(names).size).toBe(6);

    tools.forEach((tool) => {
      expect(tool.type).toBe('function');
      expect(typeof tool.function.name).toBe('string');
      expect(tool.function.name.length).toBeGreaterThan(0);
      expect(typeof tool.function.description).toBe('string');
      expect(tool.function.description.length).toBeGreaterThan(0);
      expect(tool.function.parameters.type).toBe('object');
      expect(tool.function.parameters.properties).toBeDefined();
      expect(Array.isArray(tool.function.parameters.required)).toBe(true);
    });
  });
});