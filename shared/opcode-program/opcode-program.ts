import { Opcode } from './opcode.model';
import { Utility } from '../Utility';
import { OpcodeMode } from './opcode-mode.enum';
import { Type } from '../type.enum';

export abstract class OpcodeProgram {
  get output() {
    return this._output;
  }

  get intcodeProgram() {
    return this._intcodeProgram;
  }

  set instructionLength(value: number) {
    this._instructionLength = value;
  }

  set intcodeMemory(value: string) {
    this._intcodeMemory = value;
  }

  protected _input: number;

  private _instructionLength = 4;
  private _intcodeMemory: string;
  private _intcodeProgram: number[];
  private _output: number;

  constructor(input: number, intcodeProgram: number[]) {
    this._input = input;
    this._intcodeProgram = intcodeProgram;
  }

  protected getOpcode(code: number): Opcode {
    return {
      operation: Utility.getDigit(code, 1) + Utility.getDigit(code, 2) * 10,
      parameter1: Utility.getDigit(code, 3),
      parameter2: Utility.getDigit(code, 4),
      parameter3: Utility.getDigit(code, 5)
    } as Opcode;
  }

  protected processInstruction(index: number): void {
    const opcode = this.getOpcode(this._intcodeProgram[index]);
    switch (opcode.operation) {
      case 1: {
        this.processOpcodeOne(index, opcode);
        break;
      }
      case 2: {
        this.processOpcodeTwo(index, opcode);
        break;
      }
      case 3: {
        this.processOpcodeThree(index);
        break;
      }
      case 4: {
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
        this.processOpcodeSeven(index, opcode);
        break;
      }
      case 8: {
        this.processOpcodeEight(index, opcode);
        break;
      }
      case 99: {
        this._instructionLength = Number.MAX_SAFE_INTEGER;
      }
    }
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
    this._instructionLength = 2;
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
    this._instructionLength = 4;
  }

  protected processOpcodeEight(index: number, opcode: Opcode): void {
    const param1 = this.getParameter(1, index, opcode.parameter1);
    const param2 = this.getParameter(2, index, opcode.parameter2);
    const param3 = this.getParameter(3, index, OpcodeMode.Immediate);

    const equals = param1 === param2;
    this._intcodeProgram[param3] = equals ? 1 : 0;
    this._instructionLength = 4;
  }

  protected resetMemory(): void {
    this._intcodeProgram = Utility.getArgsFromString(this._intcodeMemory, Type.Number) as number[];
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
