export class Star {
  name: string;
  level: number;
  orbiters: Star[] = [];

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}
