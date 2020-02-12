import { Utility } from '../shared/Utility';
import { OpcodeProgram } from '../shared/opcode-program/opcode-program';
import { Type } from '../shared/type.enum';

export class TESTDiagnosticProgram extends OpcodeProgram {
  constructor(input: number, intcodeProgram: string) {
    super(input, Utility.getArgsFromString(intcodeProgram, Type.Number) as number[]);
  }

  getOutput(): number {
    this.runProgram();
    return this._output;
  }

  processInstruction(index: number): void {
    const opcode = this.getOpcode(this._intcodeProgram[index]);
    switch (opcode.operation) {
      case 1: {
        this._instructionLength = 4;
        this.processOpcodeOne(index, opcode);
        break;
      }
      case 2: {
        this._instructionLength = 4;
        this.processOpcodeTwo(index, opcode);
        break;
      }
      case 3: {
        this._instructionLength = 2;
        this.processOpcodeThree(index);
        break;
      }
      case 4: {
        this._instructionLength = 2;
        this.processOpcodeFour(index, opcode);
        break;
      }
      case 5: {
        this.processOpcodeFive(index, opcode);
        break;
      }
      case 6: {
        this.processOpcodeSix(index, opcode);
        break;
      }
      case 7: {
        this._instructionLength = 4;
        this.processOpcodeSeven(index, opcode);
        break;
      }
      case 8: {
        this._instructionLength = 4;
        this.processOpcodeEight(index, opcode);
        break;
      }
      case 99: {
        this._instructionLength = Number.MAX_SAFE_INTEGER;
      }
    }
  }
}
