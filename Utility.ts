import fs = require('fs');

export class Utility {
  static getArguments(path: string, delimiter: string): number[] {
    var contents = this.readFile(path);
    return contents.split(delimiter).map(arg => Number(arg));
  }

  private static readFile(path: string): string {
    return fs.readFileSync(path, 'utf-8');
  }
}
