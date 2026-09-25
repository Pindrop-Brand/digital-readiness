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
  | 'currentContextQuestion'
  | 'showBack'
  | 'showContinue'
  | 'showSeeResults'
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
  currentContextQuestion,
  showBack,
  showContinue,
  showSeeResults,
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
            Take the self-assessment to see how your organization's exposure to AI-powered attacks
            compares to your peers. AI-backed attacks may include, but are not limited to, fake job
            candidates, contact center attacks, executive impersonation, IT helpdesk attacks, wealth
            management scams, and vendor or partner impersonation.
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
                *How this score works
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
                    <b style={{ color: '#140700' }}>How your score is calculated.</b> Six
                    questions and their respective answers, each drawn from the 2026 survey
                    conducted by Wakefield Research, are scored by assigning a point value to each
                    answer based on Pindrop's judgement on how each answer impacts readiness. These
                    scores are then summed within their pillars, and then normalized to 0–100. Your
                    composite score is the weighted sum of the three pillars: Budget and ownership
                    (35%), Tools and detection (35%), People and training (30%). The three readiness
                    tiers are: Exposed 0–39, Reactive 40–69, Prepared 70–100.
                  </p>
                  <p style={{ margin: '0 0 10px' }}>
                    <b style={{ color: '#140700' }}>On the tiers.</b> Exposed (0–39), Reactive
                    (40–69), and Prepared (70–100) are thresholds Pindrop chose, not derived from
                    the survey data. Pindrop believes they reflect meaningfully different levels of
                    readiness, but a different, equally defensible framework could draw these lines
                    in different places. Budget and ownership, tools and detection, and people and
                    training are the three pillars Pindrop infers are vital foundations for the
                    detecting and mitigation of new enterprise security threats.
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

          {isContextPage && currentContextQuestion && (
            <>
              <p style={{ fontSize: 19, fontWeight: 500, margin: '0 0 6px' }}>
                {currentContextQuestion.stem}
              </p>
              <p style={{ fontSize: 12.5, color: '#7A7166', margin: '0 0 14px', fontStyle: 'italic' }}>
                This question is used for peer benchmarking and does not impact your numerical
                readiness score.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {currentContextQuestion.opts.map((opt) => (
                  <OptionButton key={opt.label} opt={opt} />
                ))}
              </div>
            </>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            margin: '22px 0 8px',
          }}
        >
          {/* Left: Back, Continue, hint */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
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

          {/* Right: See my results */}
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
        </div>
      </div>
    </div>
  );
}
