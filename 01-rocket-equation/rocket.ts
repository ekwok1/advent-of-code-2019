import { Module } from './module.model';

export class Rocket {
  get modules() {
    return this._modules;
  }

  private _modules: Module[];

  constructor(...args: number[]) {
    this._modules = args.map(mass => new Module(mass));
  }

  getFuel(mass: number): number {
    const fuelRequired = Math.floor(mass / 3) - 2;
    return fuelRequired > 0 ? fuelRequired : 0;
  }

  getFuelForFuel(mass: number): number {
    const fuelRequired = this.getFuel(mass);

    if (!fuelRequired) {
      return 0;
    }

    return fuelRequired + this.getFuelForFuel(fuelRequired);
  }

  getFuelForRocket(): number {
    return this._modules.reduce((prev, curr) => {
      const fuelForModule = this.getFuel(curr.mass);
      const fuelForFuel = this.getFuelForFuel(fuelForModule);
      return prev + fuelForModule + fuelForFuel;
    }, 0);
  }
}
