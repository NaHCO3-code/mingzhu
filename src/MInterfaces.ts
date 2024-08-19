export interface MTimelineAgent {
  readonly duraction: number;
  readonly currentTime: number;
  pause(): void;
}