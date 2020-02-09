import { Utility } from '../Utility';
import { GravityAssistInputs } from './gravity-assist-inputs.model';

export class GravityAssistProgram {
  private _intcodeMemory: string;
  private _intcodeProgram: number[];

  constructor(intcodeMemory: string) {
    this._intcodeMemory = intcodeMemory;
    this._intcodeProgram = Utility.getArgsFromString(intcodeMemory);
  }

  findNounAndVerb(target: number): GravityAssistInputs {
    let i = 0;
    let j = 0;
    for (i = 0; i <= 99; i++) {
      for (j = 0; j <= 99; j++) {
        this.resetMemory();
        this.intcodeSwap(i, 1);
        this.intcodeSwap(j, 2);
        const output = this.getOutput(0);
        if (output === target) {
          return {
            noun: i,
            verb: j
          } as GravityAssistInputs;
        }
      }
    }
  }

  getOutput(index: number): number {
    this.runProgram();
    return this._intcodeProgram[index];
  }

  private intcodeSwap(num: number, index: number): void {
    this._intcodeProgram[index] = num;
  }

  private resetMemory(): void {
    this._intcodeProgram = Utility.getArgsFromString(this._intcodeMemory);
  }

  private runProgram(): void {
    for (let i = 0; i < this._intcodeProgram.length; i += 4) {
      this.processInstruction(i);
    }
  }

  private processInstruction(index: number): void {
    switch (this._intcodeProgram[index]) {
      case 1: {
        this._intcodeProgram[this._intcodeProgram[index + 3]] =
          this._intcodeProgram[this._intcodeProgram[index + 1]] + this._intcodeProgram[this._intcodeProgram[index + 2]];
        break;
      }
      case 2: {
        this._intcodeProgram[this._intcodeProgram[index + 3]] =
          this._intcodeProgram[this._intcodeProgram[index + 1]] * this._intcodeProgram[this._intcodeProgram[index + 2]];
      }
      case 99: {
        return;
      }
    }
  }
}
