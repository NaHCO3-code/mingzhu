import { MElement } from "./MElement";
import { MTimelineAgent } from "./MInterfaces";
import { MTimeTragger, MTragger } from "./MTragger";

type MTimeDescription = string | number

export class MTimeline implements MElement {
  elements: Map<symbol, MElement>;
  currentTime: number;
  duraction: number;
  agent: MTimelineAgent;
  private _thisSymbol: symbol = Symbol();
  private activeElements: MElement[];
  private _startTime: number = 0;
  private _paused: boolean = true;

  constructor(sym: symbol) {
    this.elements = new Map();
    this.activeElements = [];
    this.duraction = 0;
    this.currentTime = 0;
    this._thisSymbol = sym;

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
  

  add(trag: MTragger | MTimeDescription, element: MElement){
    const sym = Symbol();
    this.elements.set(sym, element);
    let tragger = trag;
    if(!(tragger instanceof MTragger)){
      tragger = this.timeToTragger(tragger);
    }
    tragger.addEventListener(()=>{this.activeElement(element)}, true);
    return sym;
  }

  play(){
    this._startTime = Date.now();
    this._paused = false;
    MTimeline.activeTiemline(this._thisSymbol);
  }

  pause(){
    
  }

  onUpdate(delta: number): void {
    console.log(`update! ${delta}`)
  }

  private activeElement(el: MElement){
    this.activeElements.push(el);
    el.onActive?.(this.agent);
  }

  /**
   * @todo relative time like "+=10", "<", etc.
   */
  private timeToTragger(time: MTimeDescription): MTragger{
    const t = typeof time === 'string' ? parseInt(time) : time;
    return MTimeTragger.create(t, this.agent);
  }

  static started: boolean = false;

  static timelines: Map<symbol, MTimeline> = new Map();

  static activeTimelines: Map<symbol, MTimeline> = new Map();

  static create(): MTimeline{
    const sym = Symbol();
    const tl = new MTimeline(sym);
    MTimeline.timelines.set(sym, tl);
    return tl;
  }

  static start(){
    if(MTimeline.started) return;
    MTimeline.started = true;
    let time = Date.now();
    setInterval(()=>{
      const dt = Date.now() - time;
      time = Date.now();
      MTimeline.activeTimelines.forEach(tl=>{
        tl.onUpdate(dt);
      });
    }, 10);
  }

  static removeTimeline(sym: symbol){
    MTimeline.timelines.delete(sym);
    MTimeline.activeTimelines.delete(sym);
  }

  static activeTiemline(sym: symbol){
    const tl = MTimeline.timelines.get(sym);
    if(!tl) throw new Error("Timeline not found");
    MTimeline.activeTimelines.set(sym, tl);
  }
}

MTimeline.start();