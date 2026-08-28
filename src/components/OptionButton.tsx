import type { OptionView } from '../types';

interface Props {
  opt: OptionView;
  dashed?: boolean;
}

export function OptionButton({ opt, dashed = false }: Props) {
  return (
    <label
      onClick={opt.onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        borderRadius: 3,
        cursor: 'pointer',
        border: dashed ? `1px dashed ${opt.border}` : `1px solid ${opt.border}`,
        background: opt.bg,
        transition: 'border-color .15s, background .15s',
      }}
    >
      <span
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 12,
          fontWeight: 600,
          width: 24,
          height: 24,
          flex: '0 0 24px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${opt.valBorder}`,
          background: opt.valBg,
          color: opt.valColor,
        }}
      >
        {opt.symbol}
      </span>
      <span style={{ fontSize: 14, color: '#140700' }}>{opt.label}</span>
    </label>
  );
}
