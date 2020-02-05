export class GravityAssistProgram {
  get intcodeProgram() {
    return this._intcodeProgram;
  }

  private _intcodeProgram: number[];

  constructor(...intcodeProgram: number[]) {
    this._intcodeProgram = intcodeProgram;
  }

  intcodeSwap(num: number, index: number): void {
    this._intcodeProgram[index] = num;
  }

  run(): number[] {
    for (let i = 0; i < this._intcodeProgram.length; i += 4) {
      this.process(i);
    }

    return this._intcodeProgram;
  }

  private process(index: number): void {
    switch (this._intcodeProgram[index]) {
      case 1: {
        this._intcodeProgram[this._intcodeProgram[index + 3]] =
          this._intcodeProgram[this._intcodeProgram[index + 1]] +
          this._intcodeProgram[this._intcodeProgram[index + 2]];
        break;
      }
      case 2: {
        this._intcodeProgram[this._intcodeProgram[index + 3]] =
          this._intcodeProgram[this._intcodeProgram[index + 1]] *
          this._intcodeProgram[this._intcodeProgram[index + 2]];
      }
      case 99: {
        return;
      }
    }
  }
}
