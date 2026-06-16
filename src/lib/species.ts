export type WaterType = 'saltwater' | 'freshwater';

export type Species = {
  commonName: string;
  scientificName: string;
};

const saltwaterSpecies: Species[] = [
  { commonName: 'Striped Bass', scientificName: 'Morone saxatilis' },
  { commonName: 'Bluefish', scientificName: 'Pomatomus saltatrix' },
  { commonName: 'Summer Flounder (Fluke)', scientificName: 'Paralichthys dentatus' },
  { commonName: 'Winter Flounder', scientificName: 'Pseudopleuronectes americanus' },
  { commonName: 'Black Sea Bass', scientificName: 'Centropristis striata' },
  { commonName: 'Scup (Porgy)', scientificName: 'Stenotomus chrysops' },
  { commonName: 'Tautog (Blackfish)', scientificName: 'Tautoga onitis' },
  { commonName: 'Weakfish', scientificName: 'Cynoscion regalis' },
  { commonName: 'Atlantic Cod', scientificName: 'Gadus morhua' },
  { commonName: 'Atlantic Mackerel', scientificName: 'Scomber scombrus' },
  { commonName: 'Spot', scientificName: 'Leiostomus xanthurus' },
  { commonName: 'Atlantic Croaker', scientificName: 'Micropogonias undulatus' },
  { commonName: 'American Eel', scientificName: 'Anguilla rostrata' },
  { commonName: 'Atlantic Herring', scientificName: 'Clupea harengus' },
  { commonName: 'American Shad', scientificName: 'Alosa sapidissima' },
  { commonName: 'Cunner', scientificName: 'Tautogolabrus adspersus' },
  { commonName: 'Northern Kingfish', scientificName: 'Menticirrhus saxatilis' },
  { commonName: 'Windowpane Flounder', scientificName: 'Scophthalmus aquosus' },
  { commonName: 'Spiny Dogfish', scientificName: 'Squalus acanthias' },
];

const freshwaterSpecies: Species[] = [
  { commonName: 'Brook Trout', scientificName: 'Salvelinus fontinalis' },
  { commonName: 'Brown Trout', scientificName: 'Salmo trutta' },
  { commonName: 'Rainbow Trout', scientificName: 'Oncorhynchus mykiss' },
  { commonName: 'Lake Trout', scientificName: 'Salvelinus namaycush' },
  { commonName: 'Largemouth Bass', scientificName: 'Micropterus salmoides' },
  { commonName: 'Smallmouth Bass', scientificName: 'Micropterus dolomieu' },
  { commonName: 'Rock Bass', scientificName: 'Ambloplites rupestris' },
  { commonName: 'Yellow Perch', scientificName: 'Perca flavescens' },
  { commonName: 'White Perch', scientificName: 'Morone americana' },
  { commonName: 'Walleye', scientificName: 'Sander vitreus' },
  { commonName: 'Northern Pike', scientificName: 'Esox lucius' },
  { commonName: 'Chain Pickerel', scientificName: 'Esox niger' },
  { commonName: 'Bluegill', scientificName: 'Lepomis macrochirus' },
  { commonName: 'Pumpkinseed', scientificName: 'Lepomis gibbosus' },
  { commonName: 'Black Crappie', scientificName: 'Pomoxis nigromaculatus' },
  { commonName: 'Channel Catfish', scientificName: 'Ictalurus punctatus' },
  { commonName: 'Brown Bullhead', scientificName: 'Ameiurus nebulosus' },
  { commonName: 'Common Carp', scientificName: 'Cyprinus carpio' },
  { commonName: 'Atlantic Salmon', scientificName: 'Salmo salar' },
  { commonName: 'Fallfish', scientificName: 'Semotilus corporalis' },
];

const speciesByWaterType: Record<WaterType, Species[]> = {
  saltwater: saltwaterSpecies,
  freshwater: freshwaterSpecies,
};

export const getSpeciesForWaterType = (waterType: WaterType): Species[] =>
  speciesByWaterType[waterType];

export const getCommonName = (scientificName: string): string =>
  [...saltwaterSpecies, ...freshwaterSpecies].find(
    (species) => species.scientificName === scientificName,
  )?.commonName ?? scientificName;
