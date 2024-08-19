import { MTimelineAgent } from "./MInterfaces";

export interface MElement {
  duraction: number;
  onActive?(tl: MTimelineAgent): void;
  onUpdate?(delta: number, tl: MTimelineAgent): void;
  onPause?(tl: MTimelineAgent): void;
  onResume?(tl: MTimelineAgent): void;
  onDestroy?(tl: MTimelineAgent): void;
}