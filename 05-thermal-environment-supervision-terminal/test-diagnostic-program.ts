import { Utility } from '../shared/Utility';
import { OpcodeProgram } from '../shared/opcode-program/opcode-program';
import { Type } from '../shared/type.enum';

export class TESTDiagnosticProgram extends OpcodeProgram {
  constructor(input: number, intcodeProgram: string) {
    super(input, Utility.getArgsFromString(intcodeProgram, Type.Number) as number[]);
  }

  getOutput(): number {
    this.runProgram();
    return this.output;
  }
}
