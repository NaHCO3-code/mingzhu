import { MDialog } from "./Mingzhu";
import { MTimeline } from "./MTimeline";

const dialog = new MDialog({
  content: 'Hello ts!'
})

const timeline = MTimeline.create();
timeline.play();