import { Opcode } from './opcode.model';
import { Utility } from '../Utility';
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
    const param1 = this.getParameter(1, index, opcode.parameter1);
    const param2 = this.getParameter(2, index, opcode.parameter2);
    this._intcodeProgram[this._intcodeProgram[index + 3]] = param1 + param2;
    this._instructionLength = 4;
  }

  protected processOpcodeTwo(index: number, opcode: Opcode): void {
    const param1 = this.getParameter(1, index, opcode.parameter1);
    const param2 = this.getParameter(2, index, opcode.parameter2);
    this._intcodeProgram[this._intcodeProgram[index + 3]] = param1 * param2;
    this._instructionLength = 4;
  }

  protected processOpcodeThree(index: number): void {
    this._intcodeProgram[this._intcodeProgram[index + 1]] = this._input;
  }

  protected processOpcodeFour(index: number, opcode: Opcode): void {
    this._output =
      opcode.parameter1 === OpcodeMode.Position
        ? this._intcodeProgram[this._intcodeProgram[index + 1]]
        : this._intcodeProgram[index + 1];
    this._instructionLength = 2;
  }

  protected processOpcodeFive(index: number, opcode: Opcode): void {
    const param1 = this.getParameter(1, index, opcode.parameter1);
    const param2 = this.getParameter(2, index, opcode.parameter2);
    const jump = param1 !== 0;
    this._instructionLength = jump ? param2 - index : 3;
  }

  protected processOpcodeSix(index: number, opcode: Opcode): void {
    const param1 = this.getParameter(1, index, opcode.parameter1);
    const param2 = this.getParameter(2, index, opcode.parameter2);
    const jump = param1 === 0;
    this._instructionLength = jump ? param2 - index : 3;
  }

  protected processOpcodeSeven(index: number, opcode: Opcode): void {
    const param1 = this.getParameter(1, index, opcode.parameter1);
    const param2 = this.getParameter(2, index, opcode.parameter2);
    const param3 = this.getParameter(3, index, OpcodeMode.Immediate);

    const lessThan = param1 < param2;
    this._intcodeProgram[param3] = lessThan ? 1 : 0;
  }

  protected processOpcodeEight(index: number, opcode: Opcode): void {
    const param1 = this.getParameter(1, index, opcode.parameter1);
    const param2 = this.getParameter(2, index, opcode.parameter2);
    const param3 = this.getParameter(3, index, OpcodeMode.Immediate);

    const equals = param1 === param2;
    this._intcodeProgram[param3] = equals ? 1 : 0;
  }

  protected runProgram(): void {
    for (let i = 0; i < this._intcodeProgram.length; i += this._instructionLength) {
      this.processInstruction(i);
    }
  }

  private getParameter(num: number, index: number, opcodeMode: OpcodeMode): number {
    return opcodeMode === OpcodeMode.Position
      ? this._intcodeProgram[this._intcodeProgram[index + num]]
      : this._intcodeProgram[index + num];
  }
}
