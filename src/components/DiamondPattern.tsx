import fractalBgRaw from '../assets/fractal-bg.svg?raw';

const FRACTAL_BG_URL = `url("data:image/svg+xml,${encodeURIComponent(fractalBgRaw)}")`;

interface Props {
  position: 'top-right' | 'bottom-left';
  size?: number;
}

export function DiamondPattern({ position }: Props) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: FRACTAL_BG_URL,
        backgroundSize: 'cover',
        backgroundPosition: position === 'top-right' ? 'right top' : 'left bottom',
        pointerEvents: 'none',
        userSelect: 'none',
        opacity: 0.5,
      }}
    />
  );
}
