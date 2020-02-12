import fs = require('fs');
import { Type } from './type.enum';

export class Utility {
  static getArgsFromString(str: string, type: Type, delimiter: string = ','): number[] | string[] {
    switch (type) {
      case Type.Number: {
        return str.split(delimiter).map(arg => Number(arg));
      }
      case Type.String: {
        return str.split(delimiter);
      }
    }
  }

  static getDigit(num: number, digit: number) {
    return Math.floor((num / Math.pow(10, digit - 1)) % 10);
  }

  static readFile(path: string): string {
    return fs.readFileSync(path, 'utf-8');
  }
}
