import {
  currentVisualizer,
  continuousVisualizer,
  VisualizerFunctions,
} from "sound-visualizer";
import { UseVisualizerOptions } from "./useVisualizer";

type UndefinedValues<T> = {
  [K in keyof T]: undefined;
};

export function visualizerWrapper(
  audio: MediaStream | null,
  canvas: HTMLCanvasElement | null,
  options: UseVisualizerOptions = {}
): VisualizerFunctions | UndefinedValues<VisualizerFunctions> {
  const { mode, ...drawOptions } = options;

  if (!audio || !canvas)
    return { stop: undefined, start: undefined, reset: undefined };

  if (mode === "current") return currentVisualizer(audio, canvas, drawOptions);

  return continuousVisualizer(audio, canvas, drawOptions);
}
