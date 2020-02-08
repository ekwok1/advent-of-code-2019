import { WireCoordinates } from './wire-coordinates';

export class CrossedWires {
  private _wire1Path: Set<string>;
  private _wire2Path: Set<string>;

  constructor(wire1: string, wire2: string) {
    this._wire1Path = this.writeWirePath(wire1);
    this._wire2Path = this.writeWirePath(wire2);
  }

  findClosestIntersection(): number {
    const intersections = new Set<string>(
      [...this._wire1Path].filter(x => this._wire2Path.has(x))
    );
    let minDistance = Number.MAX_SAFE_INTEGER;

    intersections.forEach(intersection => {
      const coords = JSON.parse(intersection) as WireCoordinates;
      const manhattanDistance = Math.abs(coords.x) + Math.abs(coords.y);
      minDistance = Math.min(manhattanDistance, minDistance);
    });

    return minDistance;
  }

  private writeWirePath(wire: string): Set<string> {
    let currentX = 0;
    let currentY = 0;
    let current: WireCoordinates;
    const wirePath = wire.split(',');
    const path = new Set<string>();

    wirePath.forEach(instruction => {
      let direction = instruction[0];
      let steps = Number(instruction.slice(1));
      switch (direction) {
        case 'R': {
          while (steps) {
            current = { x: ++currentX, y: currentY } as WireCoordinates;
            this.addCoordinates(path, current);
            steps--;
          }
        }
        case 'L': {
          while (steps) {
            current = { x: --currentX, y: currentY } as WireCoordinates;
            this.addCoordinates(path, current);
            steps--;
          }
        }
        case 'U': {
          while (steps) {
            current = { x: currentX, y: ++currentY } as WireCoordinates;
            this.addCoordinates(path, current);
            steps--;
          }
        }
        case 'D': {
          while (steps) {
            current = { x: currentX, y: --currentY } as WireCoordinates;
            this.addCoordinates(path, current);
            steps--;
          }
        }
      }
    });

    return path;
  }

  private addCoordinates(path: Set<string>, current: WireCoordinates): void {
    if (!path.has(JSON.stringify(current))) {
      path.add(JSON.stringify(current));
    }
  }
}
