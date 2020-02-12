import { OrbitMap } from './orbit-map';

fdescribe('Orbit Map', () => {
  let orbitMap: OrbitMap;
  const map = ['B)C', 'COM)B', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'];

  it('should return number of direct and indirect orbits no matter the order', () => {
    orbitMap = new OrbitMap(shuffle(map));
    expect(orbitMap.getTotalOrbits()).toBe(42);
  });

  function shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
});
