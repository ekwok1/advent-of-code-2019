import { SecureContainer } from './secure-container';

describe('Secure Container', () => {
  let container: SecureContainer;

  it('should throw an error for invalid lower bound', () => {
    expect(() => new SecureContainer(1, 999999)).toThrowError('Lower bound of 1 is invalid');
  });

  it('should throw an error for invalid upper bound', () => {
    expect(() => new SecureContainer(100000, 1000000)).toThrowError('Upper bound of 1000000 is invalid');
  });

  describe('with a valid lower and upper bound', () => {
    beforeAll(() => {
      container = new SecureContainer(100000, 999998);
    });

    it(`should be within container's range`, () => {
      expect(container.check(999999)).toBeFalse();
    });

    it('should have at least two adjacent digits that are the same', () => {
      expect(container.check(123789)).toBeFalse();
    });

    it('should have at least two adjacent digits that are not part of a larger group of matching digits', () => {
      // all
      expect(container.check(111111)).toBeFalse();
      // 5:1, 1:5
      expect(container.check(111112)).toBeFalse();
      expect(container.check(122222)).toBeFalse();
      // 4:1:1, 1:4:1, 1:1:4
      expect(container.check(111123)).toBeFalse();
      expect(container.check(122223)).toBeFalse();
      expect(container.check(123333)).toBeFalse();
      // 3:1:1:1, 1:3:1:1, 1:1:3:1, 1:1:1:3
      expect(container.check(111234)).toBeFalse();
      expect(container.check(122234)).toBeFalse();
      expect(container.check(123334)).toBeFalse();
      expect(container.check(123444)).toBeFalse();
    });

    it('should never have digits that decrease from left to right', () => {
      expect(container.check(223450)).toBeFalse();
    });
  });
});
