# react-sound-visualizer

## Description

This library acts as a lightweight React wrapper for [sound-visualizer](https://github.com/ej-shafran/sound-visualizer).

You can check it out by visiting [the codesandbox](https://codesandbox.io/s/react-sound-visualizer-demo-gi8uhd).

## Getting Started

### Installation

```bash
npm install react-sound-visualizer
```

### Usage

You'll mainly want to use the `Visualizer` component (you can see more documentation for it below):

```tsx
import { useEffect, useState } from 'react';
import { Visualizer } from 'react-sound-visualizer';

function App() {
  const [audio, setAudio] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then(setAudio);
  }, []);

  return (
      <Visualizer audio={audio}>
        {({ canvasRef, stop, start, reset }) => (
          <>
            <canvas ref={canvasRef} width={500} height={100} />

            <div>
              <button onClick={start}>Start</button>
              <button onClick={stop}>Stop</button>
              <button onClick={reset}>Reset</button>
            </div>
          </>
        )}
      </Visualizer>
  );
}

export default App;
```

If you need even more control over the visualization, the `useVisualizer` hook (used by `Visualizer` behind the scenes) is also exported.

## Documentation

### Components

#### Visualizer

##### Props

| **Prop**        | **Type**                                   | **Default**    | **Explanation**                                                                                                                                                                                                                                                                   |
|-----------------|--------------------------------------------|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **audio**       | `MediaStream \| null`                      |                | The audio to visualize. Can be `null` since usually that's how your state will be initialized, but note that the functions will not be defined while it is `null`.                                                                                                                |
| **children**    | `React.FC<VisualizerChildrenProps>`        |                | See **Types** section below.                                                                                                                                                                                                                                                      |
| **mode**        | `"current" \| "continuous"`                | `"continuous"` | The visualizer version to use. You can check out the [sound-visualizer](https://github.com/ej-shafran/sound-visualizer) docs to learn more about what each version means.                                                                                                         |
| **lineWidth**   | `number \| "thin" \| "thick" \| "default"` | `"default"`    | The width of each line drawn onto the canvas for the visualization.  <br> If a thickness string is provided, it will be translated into a percentage of the canvas's width; if a number is provided it will be used a `px` value.                                                 |
| **strokeColor** | `string`                                   | `"#000"`       | The color of each line drawn onto the canvas for the visualization.                                                                                                                                                                                                               |
| **slices**      | `number`                                   | `100`          | The number of slices drawn onto the canvas to make up the wave.  <br> *Only available as a prop when `mode` is `"continuous"`*                                                                                                                                                    |
| **heightNorm**  | `number`                                   | `1`            | A number used to normalize the height of the wave; the wave function is multiplied by this number, so a number larger than 1 will exaggerate the height of the wave, while a number between 0 and 1 will minimize it.  <br> *Only available as a prop when `mode` is `"current"`* |


### Hooks

#### useVisualizer

```typescript
export function useVisualizer(
    audio: MediaStream | null,
    canvas: HTMLCanvasElement | null,
    options?: UseVisualizerOptions
): Partial<VisualizerFunctions>;
```

The `useVisualizer` hook acts as a simple wrapper for both the `currentVisualizer` and `continuousVisualizer` functions from
`sound-visualizer`, which allows the user to pass `null` for the `audio` and `canvas` parameters
and returns an empty object if `null` is passed for either.
It also wraps the `VisualizerFunctions` that are returned in a `useMemo` hook.
(*Note:* if you would rather not use a memo, you can directly use the `visualizerWrapper` function)

### Types

#### VisualizerChildrenProps

```typescript
export interface VisualizerChildrenProps {
  canvasRef: (canvas: HTMLCanvasElement) => void;
  start?: () => void;
  stop?: () => void;
  reset?: () => void;
}
```

The `Visualizer`'s `children` prop must be a function that returns a `ReactNode`.
The `canvasRef` must be passed as the `ref` prop to an HTML `canvas` element,
*or else the visualizer will not draw anything!*

#### UseVisualizerOptions

```typescript
export type UseVisualizerOptions =
    | { mode: "current" } & DrawCurrentOptions
    | { mode?: "continuous" & DrawContinuousOptions
```

Where `DrawCurrentOptions` and `DrawContinuousOptions` are the types from `sound-visualizer`.

## Notes

The `visualizerWrapper` function, used internally by `useVisualizer`, is exposed for convenience.
