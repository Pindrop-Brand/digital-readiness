import { DiamondPattern } from './DiamondPattern';
import { OptionButton } from './OptionButton';
import type { useAssessment } from '../hooks/useAssessment';

type Props = Pick<
  ReturnType<typeof useAssessment>,
  | 'progressStepText'
  | 'progressPercent'
  | 'isPillarPage'
  | 'isContextPage'
  | 'currentStem'
  | 'currentOpts'
  | 'naLabel'
  | 'contextQuestions'
  | 'showBack'
  | 'showContinue'
  | 'showSeeResults'
  | 'showSkip'
  | 'seeResultsDisabled'
  | 'continueDisabled'
  | 'hint'
  | 'continueBg'
  | 'continueColor'
  | 'seeResultsBg'
  | 'seeResultsColor'
  | 'onBack'
  | 'onContinue'
  | 'onSeeResults'
  | 'onSkip'
  | 'pageMethodOpen'
  | 'togglePageMethod'
  | 'pageMethodGlyph'
>;

export function QuizPage({
  progressStepText,
  progressPercent,
  isPillarPage,
  isContextPage,
  currentStem,
  currentOpts,
  naLabel,
  contextQuestions,
  showBack,
  showContinue,
  showSeeResults,
  showSkip,
  seeResultsDisabled,
  continueDisabled,
  hint,
  continueBg,
  continueColor,
  seeResultsBg,
  seeResultsColor,
  onBack,
  onContinue,
  onSeeResults,
  onSkip,
  pageMethodOpen,
  togglePageMethod,
  pageMethodGlyph,
}: Props) {
  return (
    <div>
      <header
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg,#F0FF91,#FF5100,#8E2D00)',
          color: '#FFFFFF',
          padding: '34px 0 26px',
        }}
      >
        <DiamondPattern position="top-right" size={340} />
        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
          <h1
            style={{
              fontSize: 'clamp(26px,4.4vw,40px)',
              fontWeight: 600,
              lineHeight: 1.08,
              margin: '12px 0 6px',
              letterSpacing: '-.01em',
              color: '#FFFFFF',
            }}
          >
            The Deepfake Readiness Assessment
          </h1>
          <p style={{ color: '#FFFFFF', opacity: 0.85, fontSize: 16, maxWidth: 600, margin: '0 0 4px' }}>
            A 12-question self-assessment. Answer to find out where you stand against your peers
            and what to prioritize next.
          </p>
        </div>
      </header>

      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: '#FBF9F5',
          borderBottom: '1px solid #E3DED3',
          padding: '16px 0 18px',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 9,
            }}
          >
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '.06em',
                color: '#140700',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {progressStepText}
            </span>
          </div>
          <div
            style={{
              position: 'relative',
              height: 8,
              background: '#E3DED3',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${progressPercent}%`,
                background: '#FF5100',
                borderRadius: 2,
                transition: 'width .35s cubic-bezier(.2,.7,.2,1)',
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E3DED3',
            borderRadius: 4,
            padding: '28px 26px',
            margin: '16px 0',
          }}
        >
          {isPillarPage && (
            <>
              <p style={{ fontSize: 19, fontWeight: 500, margin: '0 0 6px' }}>{currentStem}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {currentOpts.map((opt) => (
                  <OptionButton key={opt.label} opt={opt} />
                ))}
              </div>
              {naLabel && (
                <div style={{ marginTop: 7 }}>
                  <OptionButton opt={naLabel} dashed />
                </div>
              )}

              <div
                onClick={togglePageMethod}
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '.04em',
                  color: '#7A7166',
                  cursor: 'pointer',
                  padding: '2px 0',
                  marginTop: 16,
                }}
              >
                <span style={{ color: '#FF5100', fontWeight: 600 }}>{pageMethodGlyph}</span>{' '}
                How this score works
              </div>
              {pageMethodOpen && (
                <div
                  style={{
                    fontSize: 12.5,
                    color: '#7A7166',
                    lineHeight: 1.6,
                    paddingTop: 10,
                  }}
                >
                  <p style={{ margin: '0 0 10px' }}>
                    <b style={{ color: '#140700' }}>How your score is calculated.</b> Five
                    questions, each drawn from a single Wakefield survey item, are scored on their
                    native answer scale and summed within their pillar, then normalized to 0–100.
                    Your composite is the weighted sum of three pillars: Budget and ownership
                    (35%), Tools and detection (35%), People and training (30%). Tiers: Exposed
                    0–39, Reactive 40–69, Prepared 70–100.
                  </p>
                  <p style={{ margin: '0 0 10px' }}>
                    <b style={{ color: '#140700' }}>On the weighting.</b> These weights and tier
                    cutoffs are Pindrop's judgment about what matters most for deepfake readiness
                    — the survey did not ask respondents to weight these factors against each
                    other, and a different, equally reasonable framework could weight them
                    differently.
                  </p>
                  <p style={{ margin: 0 }}>
                    <b style={{ color: '#140700' }}>On the six context questions.</b> Deepfake
                    encounter, attack-surface breadth, consequences experienced, cost, perceived
                    existential risk, and estimated workforce awareness describe what already
                    happened or how a respondent feels — not an actionable capability. They're
                    reported as peer benchmarks instead of folded into the score.
                  </p>
                </div>
              )}
            </>
          )}

          {isContextPage && (
            <>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: '#7A7166',
                  background: '#FBF9F5',
                  padding: '3px 8px',
                  borderRadius: 2,
                  marginBottom: 12,
                  width: 'fit-content',
                  whiteSpace: 'nowrap',
                }}
              >
                Optional
              </span>
              <p style={{ fontSize: 14, color: '#7A7166', margin: '0 0 22px' }}>
                Optional, but answer the following questions to receive detailed peer benchmark
                comparisons.
              </p>
              {contextQuestions.map((cq, i) => (
                <div
                  key={cq.id}
                  style={{
                    margin: '0 0 26px',
                    paddingBottom: 26,
                    borderBottom: i < contextQuestions.length - 1 ? '1px solid #E3DED3' : 'none',
                  }}
                >
                  <p style={{ fontSize: 16, fontWeight: 500, margin: '0 0 10px' }}>{cq.stem}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {cq.opts.map((opt) => (
                      <OptionButton key={opt.label} opt={opt} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            alignItems: 'center',
            margin: '22px 0 8px',
          }}
        >
          {showBack && (
            <button
              onClick={onBack}
              className="btn-secondary"
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                padding: '12px 22px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                background: 'transparent',
                color: '#140700',
                border: '1px solid #E3DED3',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          )}
          {showContinue && (
            <button
              onClick={onContinue}
              disabled={continueDisabled}
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                padding: '12px 22px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                border: 'none',
                cursor: continueDisabled ? 'default' : 'pointer',
                background: continueBg,
                color: continueColor,
              }}
            >
              Continue
            </button>
          )}
          {showSkip && (
            <span
              onClick={onSkip}
              className="link-hover"
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: '#7A7166',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Skip
            </span>
          )}
          {showSeeResults && (
            <button
              onClick={onSeeResults}
              disabled={seeResultsDisabled}
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                padding: '12px 22px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                border: 'none',
                cursor: seeResultsDisabled ? 'default' : 'pointer',
                background: seeResultsBg,
                color: seeResultsColor,
              }}
            >
              See my results
            </button>
          )}
          {hint && (
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                color: '#7A7166',
              }}
            >
              {hint}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
