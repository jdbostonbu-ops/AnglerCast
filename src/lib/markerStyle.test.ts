import { describe, expect, it } from 'vitest';
import { getMarkerStyle } from '@/lib/markerStyle';

describe('getMarkerStyle', () => {
  it('returns distinct marker styles for known species and a default for unknown species', () => {
    const stripedBassStyle = getMarkerStyle('Morone saxatilis');
    const brookTroutStyle = getMarkerStyle('Salvelinus fontinalis');
    const unknownStyle = getMarkerStyle('Unknown species');

    expect(stripedBassStyle).toEqual({
      color: '#3FB5A6',
      shape: 'circle',
    });
    expect(brookTroutStyle).toEqual({
      color: '#E8B04B',
      shape: 'triangle',
    });
    expect(brookTroutStyle).not.toEqual(stripedBassStyle);
    expect(unknownStyle).toEqual({
      color: '#9DB3C7',
      shape: 'pin',
    });
  });
});
