import { currentVisualizer, continuousVisualizer } from "sound-visualizer";
import { UseVisualizerOptions } from "./useVisualizer";

export function visualizerWrapper(
  audio: MediaStream | null,
  canvas: HTMLCanvasElement | null,
  options: UseVisualizerOptions = {}
) {
  const { mode, ...drawOptions } = options;

  if (!audio || !canvas) return {};

  if (mode === "current") return currentVisualizer(audio, canvas, drawOptions);

  return continuousVisualizer(audio, canvas, drawOptions);
}
