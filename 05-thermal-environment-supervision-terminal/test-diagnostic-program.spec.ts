import { TESTDiagnosticProgram } from './test-diagnostic-program';

describe('Thermal Environment Supervision Terminal Diagnostic Program', () => {
  let testProgram: TESTDiagnosticProgram;
  const defaultProgram = '3,0,4,0,99';

  beforeAll(() => {
    testProgram = new TESTDiagnosticProgram(1, defaultProgram);
  });

  it('should have an input of 1', () => {
    expect(testProgram.input).toBe(1);
  });

  it('should output 1', () => {
    expect(testProgram.getOutput()).toBe(1);
  });
});