import { OrbitMap } from './orbit-map';

fdescribe('Orbit Map', () => {
  let orbitMap: OrbitMap;
  const map = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'];
  const santaMap = [...map.slice(), 'K)YOU', 'I)SAN'] as string[];
  const altSantaMap = [...map.slice(), 'K)YOU', 'F)SAN'] as string[];

  it('should return number of direct and indirect orbits no matter the order', () => {
    orbitMap = new OrbitMap(shuffle(map));
    expect(orbitMap.getTotalOrbits()).toBe(42);
  });

  it('should return the number of orbital transfers to get from point A to point B', () => {
    orbitMap = new OrbitMap(shuffle(santaMap));
    expect(orbitMap.getOrbitalTransfers('YOU', 'SAN')).toBe(4);
  });

  it('should return the number of orbital transfers to get from point A to point B even if not direct path', () => {
    orbitMap = new OrbitMap(shuffle(altSantaMap));
    expect(orbitMap.getOrbitalTransfers('YOU', 'SAN')).toBe(3);
  });

  function shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
});
