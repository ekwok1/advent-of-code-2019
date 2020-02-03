import fs = require('fs');

export class Utility {
  static getArguments(path: string): number[] {
    var contents = fs.readFileSync(path, 'utf-8');
    return contents.split('\n').map(arg => Number(arg));
  }
}
