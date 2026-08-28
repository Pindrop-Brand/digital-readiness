const SVG_PATTERN = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
<g fill='none' stroke='white' stroke-width='0.5' stroke-opacity='0.35'>
<path d='M0 32 L32 0 L64 32 L32 64 Z'/>
<path d='M0 32 L64 32'/>
<path d='M32 0 L32 64'/>
</g>
<g fill='white'>
<circle cx='32' cy='0' r='1' fill-opacity='0.5'/>
<circle cx='0' cy='32' r='1' fill-opacity='0.5'/>
<circle cx='64' cy='32' r='1' fill-opacity='0.5'/>
<circle cx='32' cy='64' r='1' fill-opacity='0.5'/>
<circle cx='32' cy='32' r='2' fill-opacity='0.8'/>
</g>
</svg>`;

const ENCODED = `url("data:image/svg+xml,${encodeURIComponent(SVG_PATTERN)}")`;

interface Props {
  position: 'top-right' | 'bottom-left';
  size?: number;
}

export function DiamondPattern({ position, size = 520 }: Props) {
  const isTopRight = position === 'top-right';
  return (
    <div
      style={{
        position: 'absolute',
        top: isTopRight ? 0 : undefined,
        right: isTopRight ? 0 : undefined,
        bottom: isTopRight ? undefined : 0,
        left: isTopRight ? undefined : 0,
        width: size,
        height: size,
        pointerEvents: 'none',
        backgroundImage: ENCODED,
        backgroundSize: '64px 64px',
        WebkitMaskImage: isTopRight
          ? 'radial-gradient(circle at 100% 0%, white 0%, white 35%, transparent 78%)'
          : 'radial-gradient(circle at 0% 100%, white 0%, white 35%, transparent 78%)',
        maskImage: isTopRight
          ? 'radial-gradient(circle at 100% 0%, white 0%, white 35%, transparent 78%)'
          : 'radial-gradient(circle at 0% 100%, white 0%, white 35%, transparent 78%)',
      }}
    />
  );
}
