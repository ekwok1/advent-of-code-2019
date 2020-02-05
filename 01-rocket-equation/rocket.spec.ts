import { Rocket } from './rocket';

describe('Rocket', () => {
  let rocket: Rocket;

  beforeEach(() => {
    rocket = new Rocket(1, 2, 3);
  });

  it('should instantiate rocket with modules with proper masses', () => {
    expect(rocket.modules.length).toBe(3);
    expect(rocket.modules[0].mass).toBe(1);
    expect(rocket.modules[1].mass).toBe(2);
    expect(rocket.modules[2].mass).toBe(3);
  });

  it('should return fuel required based on module mass', () => {
    expect(rocket.getFuel(12)).toBe(2);
    expect(rocket.getFuel(14)).toBe(2);
    expect(rocket.getFuel(1969)).toBe(654);
    expect(rocket.getFuel(100756)).toBe(33583);
  });

  it('should return fuel required based on fuel mass', () => {
    expect(rocket.getFuelForFuel(12)).toBe(2);
    expect(rocket.getFuelForFuel(14)).toBe(2);
    expect(rocket.getFuelForFuel(1969)).toBe(966);
    expect(rocket.getFuelForFuel(100756)).toBe(50346);
  });

  it('should return total fuel for rocket', () => {
    rocket = new Rocket(12, 14, 1969, 100756);
    const totalFuel =
      rocket.getFuel(12) +
      rocket.getFuelForFuel(2) +
      rocket.getFuel(14) +
      rocket.getFuelForFuel(2) +
      rocket.getFuel(1969) +
      rocket.getFuelForFuel(654) +
      rocket.getFuel(100756) +
      rocket.getFuelForFuel(33583);
    expect(rocket.getFuelForRocket()).toBe(totalFuel);
  });
});
