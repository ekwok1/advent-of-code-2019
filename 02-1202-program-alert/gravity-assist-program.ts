import { Utility } from '../shared/Utility';
import { GravityAssistInputs } from './gravity-assist-inputs.model';
import { OpcodeProgram } from '../shared/opcode-program/opcode-program';
import { Type } from '../shared/type.enum';

export class GravityAssistProgram extends OpcodeProgram {
  constructor(input: number, intcodeMemory: string) {
    super(input, Utility.getArgsFromString(intcodeMemory, Type.Number) as number[]);
    this.intcodeMemory = intcodeMemory;
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
    return this.intcodeProgram[index];
  }

  private intcodeSwap(num: number, index: number): void {
    this.intcodeProgram[index] = num;
  }
}
