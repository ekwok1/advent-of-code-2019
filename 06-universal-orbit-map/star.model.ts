export class Star {
  name: string;
  level: number;
  orbits: Star;
  orbiters: Star[] = [];

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}
