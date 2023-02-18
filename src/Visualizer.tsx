import { useState } from "react";
import { useVisualizer, UseVisualizerOptions } from "./useVisualizer";

/**
 * The props passed to the function supplied as the child of `Visualizer`.
 **/
export interface VisualizerChildrenProps {
  /**
   * Sets the canvas for the `Visualizer` to draw on.
   * 
   * Should be passed as the `ref` prop to an HTML `canvas` element.
   **/
  canvasRef: (canvas: HTMLCanvasElement) => void;
  /**
   * Starts the visualization on the canvas.
   **/
  start?: () => void;
  /**
   * Stops the visualization, but does not clear the canvas.
   **/
  stop?: () => void;
  /**
   * Stops the visualization and clears the canvas.
   **/
  reset?: () => void;
}

export type VisualizerProps = UseVisualizerOptions & {
  /**
   * A functional component that renders out the canvas and functions used by the `Visualizer`.
   **/
  children?: React.FC<VisualizerChildrenProps>;
  /**
   * The audio to visualize.
   *
   * **Note:** it is the responsibility of the comoponent rendering `Visualizer` to stop the `MediaStream`'s tracks,
   * in case it's a recording.
   **/
  audio: MediaStream | null;
};

export const Visualizer: React.FC<VisualizerProps> = (props) => {
  const { audio, children: Children, ...visualizerOptions } = props;

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const functions = useVisualizer(audio, canvas, visualizerOptions);

  return <>{!!Children && <Children canvasRef={setCanvas} {...functions} />}</>
};
