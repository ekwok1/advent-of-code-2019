export class AmplificationCircuitFeedbackMode {
  private _program: string;

  constructor(program: string) {
    this._program = program;
  }

  getMaxThrusterSignal(): number {
    return 0;
  }
}
