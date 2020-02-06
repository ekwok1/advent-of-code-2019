import { GravityAssistProgram } from './gravity-assist-program';

describe('Gravity Assist Program', () => {
  let gaProgram: GravityAssistProgram;

  it('should process sample 1', () => {
    gaProgram = new GravityAssistProgram(1, 0, 0, 0, 99);
    expect(gaProgram.getOutput(0)).toBe(2);
  });

  it('should process sample 2', () => {
    gaProgram = new GravityAssistProgram(2, 3, 0, 3, 99);
    expect(gaProgram.getOutput(3)).toBe(6);
  });

  it('should process sample 3', () => {
    gaProgram = new GravityAssistProgram(2, 4, 4, 5, 99, 0);
    expect(gaProgram.getOutput(5)).toBe(9801);
  });

  it('should process sample 4', () => {
    gaProgram = new GravityAssistProgram(1, 1, 1, 4, 99, 5, 6, 0, 99);
    expect(gaProgram.getOutput(0)).toBe(30);
  });

  it('should find noun and verb', () => {
    gaProgram = new GravityAssistProgram(1, 0, 0, 0, 99, 1, 49);
    const obj = {
      noun: 5,
      verb: 6
    };
    expect(gaProgram.findNounAndVerb(50)).toBe(obj);
  });
});
