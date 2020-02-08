import { WireCoordinates } from "./wire-coordinates";

export class CrossedWires {
  private _wire1Map = new Map<string, number>();
  private _wire2Map = new Map<string, number>();
  private _intersections: Set<string>;

  constructor(wire1: string, wire2: string) {
    this.writeWirePath(wire1, this._wire1Map);
    this.writeWirePath(wire2, this._wire2Map);
    this._intersections = new Set<string>([...this._wire1Map.keys()].filter(x => this._wire2Map.get(x)));
  }

  findClosestIntersection(): number {
    let minDistance = Number.MAX_SAFE_INTEGER;

    this._intersections.forEach(intersection => {
      const coords = JSON.parse(intersection) as WireCoordinates;
      const manhattanDistance = Math.abs(coords.x) + Math.abs(coords.y);
      minDistance = Math.min(manhattanDistance, minDistance);
    });

    return minDistance;
  }

  findShortestIntersection(): number {
    let minSteps = Number.MAX_SAFE_INTEGER;

    this._intersections.forEach(intersection => {
      const wire1Steps = this._wire1Map.get(intersection);
      const wire2Steps = this._wire2Map.get(intersection);
      minSteps = Math.min(wire1Steps + wire2Steps, minSteps);
    });

    return minSteps;
  }

  private writeWirePath(wire: string, map: Map<string, number>): void {
    let currentX = 0;
    let currentY = 0;
    let currentSteps = 0;
    const wirePath = wire.split(",");

    wirePath.forEach(instruction => {
      let direction = instruction[0];
      let steps = Number(instruction.slice(1));
      switch (direction) {
        case "R": {
          for (let i = 0; i < steps; i++) {
            this.addCoordinates(map, ++currentX, currentY, ++currentSteps);
          }
          break;
        }
        case "L": {
          for (let i = 0; i < steps; i++) {
            this.addCoordinates(map, --currentX, currentY, ++currentSteps);
          }
          break;
        }
        case "U": {
          for (let i = 0; i < steps; i++) {
            this.addCoordinates(map, currentX, ++currentY, ++currentSteps);
          }
          break;
        }
        case "D": {
          for (let i = 0; i < steps; i++) {
            this.addCoordinates(map, currentX, --currentY, ++currentSteps);
          }
          break;
        }
      }
    });
  }

  private addCoordinates(map: Map<string, number>, currentX: number, currentY: number, steps: number): void {
    const current = {
      x: currentX,
      y: currentY
    } as WireCoordinates;
    const curr = JSON.stringify(current);
    if (!map.has(curr)) {
      map.set(curr, steps);
    }
  }
}
