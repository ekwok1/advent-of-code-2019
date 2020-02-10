import { OpcodeMode } from './opcode-mode.enum';

export interface Opcode {
  operation: number;
  parameter1: OpcodeMode;
  parameter2: OpcodeMode;
  parameter3: OpcodeMode;
}
