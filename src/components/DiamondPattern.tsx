import fractalBg from '../assets/fractal-bg.svg';

interface Props {
  position: 'top-right' | 'bottom-left';
  size?: number;
}

export function DiamondPattern({ position }: Props) {
  return (
    <img
      src={fractalBg}
      alt=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.5,
        objectPosition: position === 'top-right' ? 'right top' : 'left bottom',
pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  );
}
