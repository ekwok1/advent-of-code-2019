import { OrbitMap } from './orbit-map';

xdescribe('Orbit Map', () => {
  let orbitMap: OrbitMap;
  const map = `COM)B
  B)C
  C)D
  D)E
  E)F
  B)G
  G)H
  D)I
  E)J
  J)K
  K)L`;

  it('should return number of direct and indirect orbits', () => {
    orbitMap = new OrbitMap(map);
    expect(orbitMap.getTotalOrbits()).toBe(42);
  });
});
