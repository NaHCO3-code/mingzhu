import { MTimelineAgent } from "./MInterfaces";

enum TraggerState {
  Pending,
  Tragged
}

type MTraggerEventListener = {
  callback: () => void;
  once: boolean;
}

export abstract class MTragger {
  state: TraggerState = TraggerState.Pending;
  callbacks: Map<symbol, MTraggerEventListener> = new Map();

  abstract onObserve(): void;

  addEventListener(callback: () => void, once: boolean = true): symbol {
    const sym = Symbol();
    this.callbacks.set(sym, {callback, once});
    return sym;
  }

  removeEventListener(sym: symbol){
    this.callbacks.delete(sym);
  }

  static traggers: MTragger[] = [];

  static init(){
    setInterval(() => {
      MTragger.traggers.forEach((tragger, index) => {
        tragger.onObserve();
        if(tragger.state === TraggerState.Tragged){
          delete MTragger.traggers[index];
        }
      });
    }, 10);
  }
}

MTragger.init();

export class MTimeTragger extends MTragger {
  time: number;
  timeline: MTimelineAgent;

  constructor(time: number, tl: MTimelineAgent){
    super();
    this.time = time;
    this.timeline = tl;
  }

  onObserve(){
    if(this.timeline.currentTime >= this.time){
      this.callbacks.forEach((cb, key) => {
        cb.callback();
        if(cb.once){
          this.removeEventListener(key);
        }
      });
      this.state = TraggerState.Tragged;
    }
  }

  static create(time: number, tl: MTimelineAgent): MTimeTragger{
    return new MTimeTragger(time, tl);
  }
}