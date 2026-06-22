export type City = {
  name: string;
  region: string;
  code: string;
  lat: number;
  lng: number;
};

export const CITIES: City[] = [
  { name: 'Tokyo',      region: 'East Asia',      code: 'TYO', lat: 35.6762,  lng: 139.6503 },
  { name: 'Singapore',  region: 'Southeast Asia', code: 'SIN', lat: 1.3521,   lng: 103.8198 },
  { name: 'Dubai',      region: 'Middle East',    code: 'DXB', lat: 25.2048,  lng: 55.2708  },
  { name: 'Marseille',  region: 'Mediterranean',  code: 'MRS', lat: 43.2965,  lng: 5.3698   },
  { name: 'Rotterdam',  region: 'North Sea',      code: 'RTM', lat: 51.9244,  lng: 4.4777   },
  { name: 'New York',   region: 'North Atlantic', code: 'NYC', lat: 40.7128,  lng: -74.0060 },
  { name: 'Long Beach', region: 'Pacific Coast',  code: 'LGB', lat: 33.7701,  lng: -118.1937 },
];

// indices into CITIES — continuous global loop
export const ROUTES: Array<[number, number]> = [
  [0, 6], // Tokyo -> Long Beach
  [6, 5], // Long Beach -> NYC
  [5, 4], // NYC -> Rotterdam
  [4, 3], // Rotterdam -> Marseille
  [3, 2], // Marseille -> Dubai
  [2, 1], // Dubai -> Singapore
  [1, 0], // Singapore -> Tokyo
];
