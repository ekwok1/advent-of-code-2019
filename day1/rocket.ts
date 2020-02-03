import { Utility } from '../Utility';
import { Module } from './module.model';

class Rocket {
  private modules: Module[];

  constructor(...args: number[]) {
    this.modules = args.map(mass => new Module(mass));
  }

  getFuelForModule(mass: number): number {
    return Math.floor(mass / 3) - 2;
  }

  getFuelForRocket(): number {
    return this.modules.reduce(
      (prev, curr) => prev + this.getFuelForModule(curr.mass),
      0
    );
  }
}
