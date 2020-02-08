export class SecureContainer {
  private _lowerBound: number;
  private _upperBound: number;

  constructor(lowerBound: number, upperBound: number) {
    if (lowerBound < 100000) {
      throw new Error(`Lower bound of ${lowerBound} is invalid`);
    }

    if (upperBound > 999999) {
      throw new Error(`Upper bound of ${upperBound} is invalid`);
    }

    this._lowerBound = lowerBound;
    this._upperBound = upperBound;
  }

  allViablePasswords(): number {
    let viable = 0;

    for (let i = this._lowerBound; i <= this._upperBound; i++) {
      if (this.check(i)) {
        viable++;
      }
    }

    return viable;
  }

  check(password: number): boolean {
    if (password < this._lowerBound || password > this._upperBound) {
      return false;
    }

    const digits = password
      .toString()
      .split('')
      .map(str => Number(str));

    if (!this.alwaysIncreasing(digits)) {
      return false;
    }

    if (!this.hasTwoAdjacentSameDigits(digits)) {
      return false;
    }

    return true;
  }

  private alwaysIncreasing(digits: number[]): boolean {
    let increasing = true;

    for (let i = 0; i < digits.length; i++) {
      if (digits[i] > digits[i + 1]) {
        increasing = false;
      }
    }

    return increasing;
  }

  private hasTwoAdjacentSameDigits(digits: number[]): boolean {
    let hasAdjacent = false;

    for (let i = 0; i < digits.length; i++) {
      if (digits[i] === digits[i + 1]) {
        return true;
      }
    }

    return hasAdjacent;
  }
}
