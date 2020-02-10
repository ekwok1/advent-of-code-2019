import { TESTDiagnosticProgram } from './test-diagnostic-program';

describe('Thermal Environment Supervision Terminal Diagnostic Program', () => {
  let testProgram: TESTDiagnosticProgram;

  it('should output 1 because opcode 4 is position mode', () => {
    testProgram = new TESTDiagnosticProgram(1, '3,0,4,0,99');
    expect(testProgram.getOutput()).toBe(1);
  });

  it('should output 0 because opcode 4 is immediate mode', () => {
    testProgram = new TESTDiagnosticProgram(1, '3,0,104,0,99');
    expect(testProgram.getOutput()).toBe(0);
  });

  it('should output 1 if input === 8 - position', () => {
    testProgram = new TESTDiagnosticProgram(8, '3,9,8,9,10,9,4,9,99,-1,8');
    expect(testProgram.getOutput()).toBe(1);
  });

  it('should output 0 if input !== 8 - position', () => {
    testProgram = new TESTDiagnosticProgram(5, '3,9,8,9,10,9,4,9,99,-1,8');
    expect(testProgram.getOutput()).toBe(0);
  });

  it('should output 1 if input < 8 - position', () => {
    testProgram = new TESTDiagnosticProgram(5, '3,9,7,9,10,9,4,9,99,-1,8');
    expect(testProgram.getOutput()).toBe(1);
  });

  it('should output 0 if input >= 8 - position', () => {
    testProgram = new TESTDiagnosticProgram(10, '3,9,7,9,10,9,4,9,99,-1,8');
    expect(testProgram.getOutput()).toBe(0);
  });

  it('should output 1 if input === 8 - immediate', () => {
    testProgram = new TESTDiagnosticProgram(8, '3,3,1108,-1,8,3,4,3,99');
    expect(testProgram.getOutput()).toBe(1);
  });

  it('should output 0 if input !== 8 - immediate', () => {
    testProgram = new TESTDiagnosticProgram(10, '3,3,1108,-1,8,3,4,3,99');
    expect(testProgram.getOutput()).toBe(0);
  });

  it('should output 1 if input < 8 - immediate', () => {
    testProgram = new TESTDiagnosticProgram(5, '3,3,1107,-1,8,3,4,3,99');
    expect(testProgram.getOutput()).toBe(1);
  });

  it('should output 0 if input >= 8 - immediate', () => {
    testProgram = new TESTDiagnosticProgram(10, '3,3,1107,-1,8,3,4,3,99');
    expect(testProgram.getOutput()).toBe(0);
  });

  it('should output 0 if input === 0 - position', () => {
    testProgram = new TESTDiagnosticProgram(0, '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9');
    expect(testProgram.getOutput()).toBe(0);
  });

  it('should output 1 if input !== 0 - position', () => {
    testProgram = new TESTDiagnosticProgram(1, '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9');
    expect(testProgram.getOutput()).toBe(1);
  });

  it('should output 0 if input === 0 - immediate', () => {
    testProgram = new TESTDiagnosticProgram(0, '3,3,1105,-1,9,1101,0,0,12,4,12,99,1');
    expect(testProgram.getOutput()).toBe(0);
  });

  it('should output 1 if input !== 0 - immediate', () => {
    testProgram = new TESTDiagnosticProgram(1, '3,3,1105,-1,9,1101,0,0,12,4,12,99,1');
    expect(testProgram.getOutput()).toBe(1);
  });

  it('should output 999 if input < 8, 1000 if input === 8, 1001 if input > 8', () => {
    const program = `3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,
    1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99`;

    testProgram = new TESTDiagnosticProgram(7, program);
    expect(testProgram.getOutput()).toBe(999);

    testProgram = new TESTDiagnosticProgram(8, program);
    expect(testProgram.getOutput()).toBe(1000);

    testProgram = new TESTDiagnosticProgram(9, program);
    expect(testProgram.getOutput()).toBe(1001);
  });
});
