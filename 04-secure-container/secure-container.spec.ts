import { SecureContainer } from './secure-container';

describe('Secure Container', () => {
  let container: SecureContainer;

  it('should throw an error for invalid lower bound', () => {
    expect(() => new SecureContainer(1, 999999)).toThrowError('Lower bound of 1 is invalid');
  });

  it('should throw an error for invalid upper bound', () => {
    expect(() => new SecureContainer(100000, 1000000)).toThrowError('Upper bound of 1000000 is invalid');
  });

  describe('With a valid secure container', () => {
    beforeAll(() => {
      container = new SecureContainer(100000, 999998);
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
});
