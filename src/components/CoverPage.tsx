import { DiamondPattern } from './DiamondPattern';
import type { useAssessment } from '../hooks/useAssessment';

type Props = Pick<
  ReturnType<typeof useAssessment>,
  | 'startAssessment'
  | 'coverDisclaimerOpen'
  | 'toggleCoverDisc'
  | 'coverDiscGlyph'
>;

export function CoverPage({ startAssessment, coverDisclaimerOpen, toggleCoverDisc, coverDiscGlyph }: Props) {
  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg,#F0FF91,#FF5100,#8E2D00)',
        color: '#140700',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <DiamondPattern position="top-right" />
      <DiamondPattern position="bottom-left" />

      <div
        style={{
          position: 'relative',
          maxWidth: 860,
          margin: '0 auto',
          padding: '60px 20px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(30px,5.2vw,48px)',
            fontWeight: 600,
            lineHeight: 1.1,
            margin: '0 0 16px',
            letterSpacing: '-.01em',
            color: '#FFFFFF',
          }}
        >
          The Deepfake Readiness Assessment
        </h1>
        <p
          style={{
            color: '#FFFFFF',
            opacity: 0.85,
            fontSize: 17,
            maxWidth: 520,
            margin: '0 auto 34px',
          }}
        >
          A 12-question self-assessment. Answer to find out where you stand against your peers
          and what to prioritize next.
        </p>
        <button
          onClick={startAssessment}
          className="btn-hover"
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            padding: '14px 30px',
            borderRadius: 999,
            whiteSpace: 'nowrap',
            background: '#140700',
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Start assessment
        </button>

        <div
          style={{
            background: 'rgba(255,255,255,.10)',
            border: '1px solid rgba(255,255,255,.28)',
            borderLeft: '4px solid #FFFFFF',
            borderRadius: 3,
            textAlign: 'left',
            maxWidth: 560,
            margin: '34px auto 0',
            color: '#FFFFFF',
          }}
        >
          <div
            onClick={toggleCoverDisc}
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 11,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              fontWeight: 600,
              padding: '14px 20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Disclaimer</span>
            <span>{coverDiscGlyph}</span>
          </div>
          {coverDisclaimerOpen && (
            <div
              style={{
                padding: '0 20px 16px',
                fontSize: 13.5,
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              <p style={{ margin: '0 0 10px' }}>
                The final assessment score is based on your answers to six questions. These
                questions mirror the questions in a 2026 survey conducted by Wakefield Research.
                The survey asked each respondent about AI attacks at their enterprise but did not
                ask them to rank or weight what they viewed as vital to enterprise readiness.
              </p>
              <p style={{ margin: '0 0 10px' }}>
                Pindrop's framework hinges on three categories that Pindrop assumes to be most
                important for deepfake readiness: budget and ownership, tools and detection, and
                people and training.
              </p>
              <p style={{ margin: 0 }}>
                A different, equally defensible framework could weigh these three pillars
                differently. Full details in the methodology footer.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
