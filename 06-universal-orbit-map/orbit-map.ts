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

  getOrbitalTransfers(from: string, to: string): number {
    /*
     * distance between two nodes (node 1 and node 2) in a tree:
     * distance between node 1 and root node +
     * distance between node 2 and root node -
     * 2 * distance between LCA and root node
     */

    const node1 = this._starMap.get(from);
    const node2 = this._starMap.get(to);
    const lca = this.getLCA(node1, node2);

    const distance =
      this.getDistanceFromRoot(node1) + this.getDistanceFromRoot(node2) - 2 * this.getDistanceFromRoot(lca);
    const orbitalTransfers = distance - 2;

    return orbitalTransfers;
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
        // set orbiter orbits orbited
        // set both in map
        orbited = new Star(stars[0], 0);
        orbiter = new Star(stars[1], 1);
        orbited.orbiters.push(orbiter);
        orbiter.orbits = orbited;
        this._starMap.set(orbited.name, orbited);
        this._starMap.set(orbiter.name, orbiter);
      } else if (orbited && !orbiter) {
        // create new star for orbiter with orbiter.level + 1
        // push orbiter into orbited's orbiters array
        // set orbter orbits orbited
        // set orbiter in map
        orbiter = new Star(stars[1], orbited.level + 1);
        orbited.orbiters.push(orbiter);
        orbiter.orbits = orbited;
        this._starMap.set(orbiter.name, orbiter);
      } else if (orbiter && !orbited) {
        // create new star for orbited with level 0
        // push orbiter into orbited's orbiters array
        // set orbiter orbits orbited
        // update orbiter and all descendants level
        // set orbited in map
        orbited = new Star(stars[0], 0);
        orbited.orbiters.push(orbiter);
        orbiter.level += 1;
        orbiter.orbits = orbited;
        this.updateAllDescendants(orbiter.orbiters, orbiter.level);
        this._starMap.set(orbited.name, orbited);
      } else {
        // push orbiter into orbited's orbiters array
        // set orbiter orbits orbited
        // update orbiter and all descendants level
        orbited.orbiters.push(orbiter);
        orbiter.level = orbited.level + 1;
        orbiter.orbits = orbited;
        this.updateAllDescendants(orbiter.orbiters, orbiter.level);
      }
    }
  }

  private getDistanceFromRoot(node: Star): number {
    return node.level - 1;
  }

  private getLevelDifference(node1: Star, node2: Star): number {
    return Math.abs(node1.level - node2.level);
  }

  private getNodeLevelRelationship(node1: Star, node2: Star): { closer: Star; further: Star } {
    if (node1.level > node2.level) {
      return {
        closer: node2,
        further: node1
      };
    }

    if (node2.level > node1.level) {
      return {
        closer: node1,
        further: node2
      };
    }

    return null;
  }

  private getLCA(node1: Star, node2: Star): Star {
    const relationship = this.getNodeLevelRelationship(node1, node2);
    let closer = relationship ? relationship.closer : null;
    let further = relationship ? relationship.further : null;
    const levelDifference = relationship ? this.getLevelDifference(node1, node2) : 0;

    // move further node to same level as closer node
    for (let i = 0; i < levelDifference; i++) {
      further = further.orbits;
    }

    let lca: Star;
    while (closer !== further) {
      closer = closer.orbits;
      further = further.orbits;
      lca = further;
    }

    return lca;
  }

  private updateAllDescendants(descendants: Star[], parentLevel: number): void {
    descendants.forEach(orbiter => {
      orbiter.level = parentLevel + 1;
      this.updateAllDescendants(orbiter.orbiters, orbiter.level);
    });
  }
}
