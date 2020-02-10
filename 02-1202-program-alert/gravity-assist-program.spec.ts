import { GravityAssistProgram } from './gravity-assist-program';
import { GravityAssistInputs } from './gravity-assist-inputs.model';

describe('Gravity Assist Program', () => {
  let gaProgram: GravityAssistProgram;
  const id = 0;

  it('should process sample 1', () => {
    gaProgram = new GravityAssistProgram(id, '1,0,0,0,99');
    expect(gaProgram.getOutput(0)).toBe(2);
  });

  it('should process sample 2', () => {
    gaProgram = new GravityAssistProgram(id, '2,3,0,3,99');
    expect(gaProgram.getOutput(3)).toBe(6);
  });

  it('should process sample 3', () => {
    gaProgram = new GravityAssistProgram(id, '2,4,4,5,99,0');
    expect(gaProgram.getOutput(5)).toBe(9801);
  });

  it('should process sample 4', () => {
    gaProgram = new GravityAssistProgram(id, '1,1,1,4,99,5,6,0,99');
    expect(gaProgram.getOutput(0)).toBe(30);
  });

  it('should find noun and verb', () => {
    gaProgram = new GravityAssistProgram(id, '1,0,0,0,99,1,49');
    const obj = {
      noun: 0,
      verb: 6
    } as GravityAssistInputs;
    expect(gaProgram.findNounAndVerb(50)).toEqual(obj);
  });
});
