import { OpcodeProgram } from '../shared/opcode-program/opcode-program';
import { Utility } from '../shared/Utility';
import { Type } from '../shared/type.enum';

export class AmplicationCircuit extends OpcodeProgram {
  private _firstInput = true;
  private _secondInput = 0;
  private _phaseSettings = [0, 1, 2, 3, 4];

  constructor(input: number, intcodeProgram: string) {
    super(input, Utility.getArgsFromString(intcodeProgram, Type.Number) as number[]);
    this.intcodeMemory = intcodeProgram;
  }

  getOutput(input: number): number {
    this._input = input;
    this.runProgram();
    return this.output;
  }

  getMaxThrusterSignal(): number {
    const permutations = Utility.getPermutations(this._phaseSettings);
    let maxThrusterSignal = Number.MIN_SAFE_INTEGER;

    permutations.forEach(permutation => {
      permutation.forEach(setting => {
        this._secondInput = this.getOutput(setting);
        this.resetMemory();
      });

      // secondInput at the end of permutation's forEach loop is final output of AmpE
      maxThrusterSignal = Math.max(this._secondInput, maxThrusterSignal);
      this._secondInput = 0;
    });

    return maxThrusterSignal;
  }

  protected processOpcodeThree(index: number): void {
    if (this._firstInput) {
      this.intcodeProgram[this.intcodeProgram[index + 1]] = this._input;
    } else {
      this.intcodeProgram[this.intcodeProgram[index + 1]] = this._secondInput;
    }

    this._firstInput = !this._firstInput;
  }
}
