import { MElement } from "./MElement";
import { MTimelineAgent } from "./MInterfaces";

export interface MDialogCfg {
  content: string;
}

export class MDialog implements MElement {  
  duraction: number;
  config: MDialogCfg;
  
  constructor(config: MDialogCfg) {
    this.duraction = 1000;
    this.config = config;
  }

  onActive(tl: MTimelineAgent): void {
    console.log(this.config.content);
    setTimeout(tl.pause, 1000);
  }

  onUpdate(delta: number): void {
    console.log(`update! delta: ${delta}`)
  }

  static create(config: MDialogCfg): MDialog {
    return new MDialog(config);
  }
}