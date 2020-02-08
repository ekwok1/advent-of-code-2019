import { CrossedWires } from './crossed-wires';

describe('Crossed Wires Program', () => {
  let crossed: CrossedWires;
  let wire1: string;
  let wire2: string;

  it('should get manhattan distance of closest intersection for example 1', () => {
    wire1 = 'R8,U5,L5,D3';
    wire2 = 'U7,R6,D4,L4';
    crossed = new CrossedWires(wire1, wire2);
    expect(crossed.findClosestIntersection()).toBe(6);
  });

  it('should get manhattan distance of closet intersection for example 2', () => {
    wire1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
    wire2 = 'U62,R66,U55,R34,D71,R55,D58,R83';
    crossed = new CrossedWires(wire1, wire2);
    expect(crossed.findClosestIntersection()).toBe(159);
  });

  it('should get manhattan distance of closest intersection for example 3', () => {
    wire1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
    wire2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';
    crossed = new CrossedWires(wire1, wire2);
    expect(crossed.findClosestIntersection()).toBe(135);
  });

  it('should get minimum number of total steps to intersection for example 1', () => {
    wire1 = 'R8,U5,L5,D3';
    wire2 = 'U7,R6,D4,L4';
    crossed = new CrossedWires(wire1, wire2);
    expect(crossed.findShortestIntersection()).toBe(30);
  });

  it('should get minimum number of total steps to intersection for example 2', () => {
    wire1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
    wire2 = 'U62,R66,U55,R34,D71,R55,D58,R83';
    crossed = new CrossedWires(wire1, wire2);
    expect(crossed.findShortestIntersection()).toBe(610);
  });

  it('should get minimum number of total steps to intersection for example 1', () => {
    wire1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
    wire2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';
    crossed = new CrossedWires(wire1, wire2);
    expect(crossed.findShortestIntersection()).toBe(410);
  });
});
