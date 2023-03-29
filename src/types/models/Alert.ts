export type Severity = 'error' | 'info' | 'success' | 'warning';

export interface Alert {
  id: number;
  severity: Severity;
  text: string;
}