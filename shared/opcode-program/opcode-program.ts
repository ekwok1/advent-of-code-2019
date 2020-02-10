import { Opcode } from './opcode.model';
import { Utility } from '../../Utility';
import { OpcodeMode } from './opcode-mode.enum';

export abstract class OpcodeProgram {
  protected _input: number;
  protected _instructionLength = 4;
  protected _intcodeProgram: number[];
  protected _output: number;

  constructor(input: number, intcodeProgram: number[]) {
    this._input = input;
    this._intcodeProgram = intcodeProgram;
  }

  abstract processInstruction(index: number): void;

  protected getOpcode(code: number): Opcode {
    return {
      operation: Utility.getDigit(code, 1) + Utility.getDigit(code, 2) * 10,
      parameter1: Utility.getDigit(code, 3),
      parameter2: Utility.getDigit(code, 4),
      parameter3: Utility.getDigit(code, 5)
    } as Opcode;
  }

  protected processOpcodeOne(index: number, opcode: Opcode): void {
    const param1 = this.getParameter(1, index, opcode);
    const param2 = this.getParameter(2, index, opcode);
    this._intcodeProgram[this._intcodeProgram[index + 3]] = param1 + param2;
  }

  protected processOpcodeTwo(index: number, opcode: Opcode): void {
    const param1 = this.getParameter(1, index, opcode);
    const param2 = this.getParameter(2, index, opcode);
    this._intcodeProgram[this._intcodeProgram[index + 3]] = param1 * param2;
  }

  protected processOpcodeThree(index: number): void {
    this._intcodeProgram[this._intcodeProgram[index + 1]] = this._input;
  }

  protected processOpcodeFour(index: number, opcode: Opcode): void {
    this._output =
      opcode.parameter1 === OpcodeMode.Position
        ? this._intcodeProgram[this._intcodeProgram[index + 1]]
        : this._intcodeProgram[index + 1];
    console.log(this._output);
  }

  protected runProgram(): void {
    for (let i = 0; i < this._intcodeProgram.length; i += this._instructionLength) {
      this.processInstruction(i);
    }
  }

  private getParameter(num: number, index: number, opcode: Opcode): number {
    const param = num === 1 ? opcode.parameter1 : opcode.parameter2;
    return param === OpcodeMode.Position
      ? this._intcodeProgram[this._intcodeProgram[index + num]]
      : this._intcodeProgram[index + num];
  }
}
