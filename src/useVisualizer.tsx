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

/**
 * The options passed to `useVisualizer`.
 * Also part of the props for `Visualizer`, and the options for `visualizerWrapper`.
 **/
export type UseVisualizerOptions = CurrentOptions | ContinuousOptions;

type UndefinedValues<T> = {
  [K in keyof T]: undefined;
}

/**
 * Hook that wraps the `visualizer` functions from `sound-visualizer` with a `useMemo`.
 * 
 * @param audio the audio to visualize
 * @param canvas the canvas to draw on
 * @param options additional options for the `draw` functions.
 * 
 * @returns either the `VisualizerFunctions` from `sound-visualizer` or an empty object, depending on if `audio` or `canvas` are `null` or not.
 **/
export function useVisualizer(
  audio: MediaStream | null,
  canvas: HTMLCanvasElement | null,
  options: UseVisualizerOptions
): VisualizerFunctions | UndefinedValues<VisualizerFunctions> {
  return useMemo(() => {
    return visualizerWrapper(audio, canvas, options);
  }, [canvas, audio]);
}
