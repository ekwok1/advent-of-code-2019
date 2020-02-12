import { Utility } from '../shared/Utility';
import { Type } from '../shared/type.enum';
import { Star } from './star.model';

export class OrbitMap {
  private _orbitMapList: string[];
  private _starMap: Map<string, Star> = new Map<string, Star>();

  constructor(orbitMapList: string[]) {
    this._orbitMapList = orbitMapList;
    this.buildStarMap();
  }

  getTotalOrbits(): number {
    let totalOrbits = 0;

    this._starMap.forEach(star => {
      totalOrbits += star.level;
    });

    return totalOrbits;
  }

  private buildStarMap(): void {
    for (let i = 0; i < this._orbitMapList.length; i++) {
      const stars = this._orbitMapList[i].split(')');
      let orbited = this._starMap.get(stars[0]);
      let orbiter = this._starMap.get(stars[1]);

      if (!orbited && !orbiter) {
        // create new star for both with level 0 and level 1
        // push orbiter into orbited's orbiters array
        // set both in map
        orbited = new Star(stars[0], 0);
        orbiter = new Star(stars[1], 1);
        orbited.orbiters.push(orbiter);
        this._starMap.set(orbited.name, orbited);
        this._starMap.set(orbiter.name, orbiter);
      } else if (orbited && !orbiter) {
        // create new star for orbiter with orbiter.level + 1
        // push orbiter into orbited's orbiters array
        // set orbiter in map
        orbiter = new Star(stars[1], orbited.level + 1);
        orbited.orbiters.push(orbiter);
        this._starMap.set(orbiter.name, orbiter);
      } else if (orbiter && !orbited) {
        // create new star for orbited with level 0
        // push orbiter into orbited's orbiters array
        // update orbiter and all descendants level
        // set orbited in map
        orbited = new Star(stars[0], 0);
        orbited.orbiters.push(orbiter);
        orbiter.level += 1;
        this.updateAllDescendants(orbiter.orbiters, orbiter.level);
        this._starMap.set(orbited.name, orbited);
      } else {
        // push orbiter into orbited's orbiters array
        // update orbiter and all descendants level
        orbited.orbiters.push(orbiter);
        orbiter.level = orbited.level + 1;
        this.updateAllDescendants(orbiter.orbiters, orbiter.level);
      }
    }
  }

  private updateAllDescendants(descendants: Star[], parentLevel: number): void {
    descendants.forEach(orbiter => {
      orbiter.level = parentLevel + 1;
      this.updateAllDescendants(orbiter.orbiters, orbiter.level);
    });
  }
}
