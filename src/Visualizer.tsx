import { useState } from "react";
import { useVisualizer, UseVisualizerOptions } from "./useVisualizer";

export interface VisualizerChildrenProps {
  canvasRef: (canvas: HTMLCanvasElement) => void;
  start?: () => void;
  stop?: () => void;
  reset?: () => void;
}

export type VisualizerProps = UseVisualizerOptions & {
  children?: React.FC<VisualizerChildrenProps>;
  audio: MediaStream | null;
};

export const Visualizer: React.FC<VisualizerProps> = (props) => {
  const { audio, children: Children, ...visualizerOptions } = props;

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const functions = useVisualizer(audio, canvas, visualizerOptions);

  return <>{!!Children && <Children canvasRef={setCanvas} {...functions} />}</>
};
