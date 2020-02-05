export class Module {
  get mass() {
    return this._mass;
  }

  private _mass: number;

  constructor(mass: number) {
    this._mass = mass;
  }
}
