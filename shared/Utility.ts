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

  /*
   * Reference:
   * https://stackoverflow.com/questions/9960908/permutations-in-javascript/11629015#11629015
   */
  static getPermutations(arr: number[]) {
    const length = arr.length;
    const result = [arr.slice()];
    const c = new Array(length).fill(0);
    let i = 1;
    let k: number;
    let p: number;

    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = arr[i];
        arr[i] = arr[k];
        arr[k] = p;
        ++c[i];
        i = 1;
        result.push(arr.slice());
      } else {
        c[i] = 0;
        ++i;
      }
    }

    return result;
  }

  static readFile(path: string): string {
    return fs.readFileSync(path, 'utf-8');
  }
}
