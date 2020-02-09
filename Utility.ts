import fs = require('fs');

export class Utility {
  static getArgsFromString(str: string, delimiter: string = ','): number[] {
    return str.split(delimiter).map(arg => Number(arg));
  }

  static getDigit(num: number, digit: number) {
    return Math.floor((num / Math.pow(10, digit - 1)) % 10);
  }

  static readFile(path: string): string {
    return fs.readFileSync(path, 'utf-8');
  }
}
