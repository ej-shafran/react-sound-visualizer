import { useMemo } from "react";
import {
  VisualizerFunctions,
  DrawCurrentOptions,
  DrawContinuousOptions,
} from "sound-visualizer";
import { visualizerWrapper } from "./visualizerWrapper";

type CurrentOptions = {
  mode: "current";
} & DrawCurrentOptions;

type ContinuousOptions = {
  mode?: "continuous";
} & DrawContinuousOptions;

export type UseVisualizerOptions = CurrentOptions | ContinuousOptions;

export function useVisualizer(
  audio: MediaStream | null,
  canvas: HTMLCanvasElement | null,
  options: UseVisualizerOptions
): Partial<VisualizerFunctions> {
  return useMemo(() => {
    return visualizerWrapper(audio, canvas, options);
  }, [canvas, audio]);
}
