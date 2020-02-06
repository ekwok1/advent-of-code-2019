import fs = require('fs');

export class Utility {
  static getArgsFromString(str: string, delimiter: string = ','): number[] {
    return str.split(delimiter).map(arg => Number(arg));
  }

  static readFile(path: string): string {
    return fs.readFileSync(path, 'utf-8');
  }
}
