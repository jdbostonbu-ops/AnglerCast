type MarkerStyle = {
  color: string;
  shape: 'circle' | 'triangle' | 'pin';
};

const defaultMarkerStyle: MarkerStyle = {
  color: '#9DB3C7',
  shape: 'pin',
};

const speciesMarkerStyles: Record<string, MarkerStyle> = {
  'Morone saxatilis': {
    color: '#3FB5A6',
    shape: 'circle',
  },
  'Salvelinus fontinalis': {
    color: '#E8B04B',
    shape: 'triangle',
  },
};

export const getMarkerStyle = (speciesName: string): MarkerStyle =>
  speciesMarkerStyles[speciesName] ?? defaultMarkerStyle;
