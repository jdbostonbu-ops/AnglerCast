import { describe, expect, it } from 'vitest';
import { FRESHWATER_AGENT_TOOLS } from '@/lib/freshwaterAgentTools';

type ToolEntry = {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, unknown>;
      required: string[];
    };
  };
};

describe('FRESHWATER_AGENT_TOOLS', () => {
  it('RED 38.8 — exposes exactly two OpenAI-shaped function tools with unique names and valid JSON Schema parameters', () => {
    const tools = FRESHWATER_AGENT_TOOLS as ReadonlyArray<ToolEntry>;
    expect(tools).toHaveLength(2);

    const names = tools.map((tool) => tool.function.name);
    expect(new Set(names).size).toBe(2);
    expect(names).toContain('forecast');
    expect(names).toContain('usgs');
    expect(names).not.toContain('marine');
    expect(names).not.toContain('obis');
    expect(names).not.toContain('gbif');
    expect(names).not.toContain('noaa');

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