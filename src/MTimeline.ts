import { MElement } from "./MElement";
import { MTimelineAgent } from "./MInterfaces";
import { MTimeTragger, MTragger } from "./MTragger";

type MTimeDescription = string | number

export class MTimeline {
  elements: Map<MTragger, MElement>;
  currentTime: number;
  duraction: number;
  agent: MTimelineAgent;

  constructor() {
    this.elements = new Map();
    this.duraction = 0;
    this.currentTime = 0;

    this.agent = {
      get currentTime(): number {
        return this.currentTime;
      },
      get duraction(): number {
        return this.duraction;
      },
      pause: this.pause
    }
  }

  add(tragger: MTragger | MTimeDescription, element: MElement){
    if(!(tragger instanceof MTragger)){
      tragger = this.timeToTragger(tragger);
    }
    tragger.addEventListener(()=>{}, true);
  }

  pause(){
    
  }

  /**
   * @todo relatively time like "+=10", "<", etc.
   */
  private timeToTragger(time: MTimeDescription): MTragger{
    return MTimeTragger.create(typeof time === 'string' ? parseInt(time) : time, this.agent);
  }
}
