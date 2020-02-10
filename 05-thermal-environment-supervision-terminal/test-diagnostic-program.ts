import { Utility } from '../Utility';
import { Opcode } from '../shared/opcode.model';
import { OpcodeMode } from '../shared/opcode-mode.enum';

export class TESTDiagnosticProgram {
  get input(): number {
    return this._input;
  }

  private _instructionLength = 4;
  private _intcodeProgram: number[];
  private _input: number;
  private _output: number;

  constructor(input: number, intcodeProgram: string) {
    this._input = input;
    this._intcodeProgram = Utility.getArgsFromString(intcodeProgram);
  }

  getOutput(): number {
    this.runProgram();
    return this._output;
  }

  private getOpcode(code: number): Opcode {
    return {
      operation: Utility.getDigit(code, 1) + Utility.getDigit(code, 2) * 10,
      parameter1: Utility.getDigit(code, 3),
      parameter2: Utility.getDigit(code, 4),
      parameter3: Utility.getDigit(code, 5)
    } as Opcode;
  }

  private getParameter(num: number, index: number, opcode: Opcode): number {
    const param = num === 1 ? opcode.parameter1 : opcode.parameter2;
    return param === OpcodeMode.Position
      ? this._intcodeProgram[this._intcodeProgram[index + num]]
      : this._intcodeProgram[index + num];
  }

  private runProgram(): void {
    for (let i = 0; i < this._intcodeProgram.length; i += this._instructionLength) {
      this.processInstruction(i);
    }
  }

  private processInstruction(index: number): void {
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
      case 99: {
        this._instructionLength = Number.MAX_SAFE_INTEGER;
      }
    }
  }

  private processOpcodeOne(index: number, opcode: Opcode): void {
    const param1 = this.getParameter(1, index, opcode);
    const param2 = this.getParameter(2, index, opcode);
    this._intcodeProgram[this._intcodeProgram[index + 3]] = param1 + param2;
  }

  private processOpcodeTwo(index: number, opcode: Opcode): void {
    const param1 = this.getParameter(1, index, opcode);
    const param2 = this.getParameter(2, index, opcode);
    this._intcodeProgram[this._intcodeProgram[index + 3]] = param1 * param2;
  }

  private processOpcodeThree(index: number): void {
    this._intcodeProgram[this._intcodeProgram[index + 1]] = this._input;
  }

  private processOpcodeFour(index: number, opcode: Opcode): void {
    this._output =
      opcode.parameter1 === OpcodeMode.Position
        ? this._intcodeProgram[this._intcodeProgram[index + 1]]
        : this._intcodeProgram[index + 1];
    console.log(this._output);
  }
}
