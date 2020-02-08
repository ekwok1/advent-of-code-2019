import { SecureContainer } from './secure-container';

describe('Crossed Wires Program', () => {
  let container: SecureContainer;

  beforeAll(() => {
    container = new SecureContainer(100000, 999998);
  });

  it('should be six digit number', () => {
    expect(container.check(99999)).toBeFalse();
  });

  it(`should be within container's range`, () => {
    expect(container.check(999999)).toBeFalse();
  });

  it('should have at least two adjacent digits that are the same', () => {
    expect(container.check(123789)).toBeFalse();
  });

  it('should never have digits that decrease from left to right', () => {
    expect(container.check(223450)).toBeFalse();
  });
});
