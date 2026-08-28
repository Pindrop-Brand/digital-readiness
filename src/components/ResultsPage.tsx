import type { useAssessment } from '../hooks/useAssessment';

type Props = Pick<
  ReturnType<typeof useAssessment>,
  | 'tierName'
  | 'isExposed'
  | 'isReactive'
  | 'isPrepared'
  | 'scoreRounded'
  | 'tagline'
  | 'diffTxt'
  | 'peerAvg'
  | 'pillarBars'
  | 'contextCards'
  | 'recPillarName'
  | 'recBody'
  | 'peerAccOpen'
  | 'togglePeerAcc'
  | 'peerAccGlyph'
  | 'footerMethodOpen'
  | 'toggleFooterMethod'
  | 'footerMethodGlyph'
  | 'onPrint'
  | 'reset'
>;

function TierIcon({ isExposed, isReactive, isPrepared }: { isExposed: boolean; isReactive: boolean; isPrepared: boolean }) {
  if (isExposed) {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ color: '#FFFFFF' }}>
        <polygon points="18,4 38,4 52,18 52,38 38,52 18,52 4,38 4,18" stroke="currentColor" strokeWidth="3" />
        <rect x="26.5" y="16" width="3" height="18" fill="currentColor" />
        <circle cx="28" cy="40" r="2.2" fill="currentColor" />
      </svg>
    );
  }
  if (isReactive) {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ color: '#FFFFFF' }}>
        <path d="M28 6 L52 48 L4 48 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <rect x="26.5" y="22" width="3" height="14" fill="currentColor" />
        <circle cx="28" cy="41" r="2.2" fill="currentColor" />
      </svg>
    );
  }
  if (isPrepared) {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ color: '#FFFFFF' }}>
        <path d="M28 4 L50 12 L50 27 C50 41 40 49 28 52 C16 49 6 41 6 27 L6 12 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M19 27 L25.5 34 L38 20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

export function ResultsPage({
  tierName,
  isExposed,
  isReactive,
  isPrepared,
  scoreRounded,
  tagline,
  diffTxt,
  peerAvg,
  pillarBars,
  contextCards,
  recPillarName,
  recBody,
  peerAccOpen,
  togglePeerAcc,
  peerAccGlyph,
  footerMethodOpen,
  toggleFooterMethod,
  footerMethodGlyph,
  onPrint,
  reset,
}: Props) {
  return (
    <div>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
        <div
          style={{
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid #E3DED3',
            margin: '26px 0 20px',
          }}
        >
          {/* Score header */}
          <div
            style={{
              background:
                'linear-gradient(rgba(20,7,0,.35),rgba(20,7,0,.15)), linear-gradient(135deg,#B0E7EB,#F0FF91,#FF5100)',
              color: '#FFFFFF',
              padding: '36px 26px',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 14px' }}>
              <TierIcon isExposed={isExposed} isReactive={isReactive} isPrepared={isPrepared} />
            </div>
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 'clamp(34px,7vw,54px)',
                fontWeight: 600,
                letterSpacing: '-.01em',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                color: '#FFFFFF',
              }}
            >
              {tierName}
            </div>
            <div style={{ margin: '8px 0 0', fontFamily: "'Geist Mono', monospace" }}>
              <span style={{ fontSize: 20, fontWeight: 600, color: '#FFFFFF' }}>{scoreRounded}</span>
              <span style={{ fontSize: 13, color: '#FFFFFF', opacity: 0.75, marginLeft: 2 }}>/100</span>
            </div>
            <p
              style={{
                color: '#FFFFFF',
                opacity: 0.9,
                fontSize: 14.5,
                maxWidth: 480,
                margin: '16px auto 0',
              }}
            >
              {tagline}
            </p>
          </div>

          {/* Score body */}
          <div style={{ background: '#FFFFFF', padding: 26 }}>
            {/* Pillar bars */}
            {pillarBars.map((pb) => (
              <div key={pb.name} style={{ margin: '0 0 18px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 3,
                  }}
                >
                  <span style={{ fontSize: 14.5, fontWeight: 600 }}>
                    {pb.name}
                    {pb.low && (
                      <span
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 10,
                          color: '#140700',
                          letterSpacing: '.06em',
                          marginLeft: 8,
                        }}
                      >
                        PRIORITY
                      </span>
                    )}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 14,
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums',
                      color: pb.color,
                    }}
                  >
                    {pb.value}
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: '#7A7166', margin: '0 0 6px' }}>{pb.meaning}</p>
                <div
                  style={{
                    height: 9,
                    background: '#FBF9F5',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      borderRadius: 2,
                      width: `${pb.width}%`,
                      background: pb.color,
                      transition: 'width .8s cubic-bezier(.2,.7,.2,1)',
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Peer comparison */}
            <div
              style={{
                background: '#FBF9F5',
                border: '1px solid #E3DED3',
                borderRadius: 4,
                padding: '18px 20px',
                margin: '0 0 22px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: '#7A7166',
                  margin: '0 0 8px',
                }}
              >
                Peer comparison
              </p>
              <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 8px' }}>
                You&apos;re <b style={{ color: '#140700' }}>{diffTxt}</b> (Peer average: {peerAvg})
              </p>
              <p style={{ fontSize: 12.5, color: '#7A7166', lineHeight: 1.5, margin: 0 }}>
                Peer average is calculated by averaging each question separately, then creating a
                composite score based on those averages.
              </p>

              <div
                onClick={togglePeerAcc}
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  color: '#7A7166',
                  cursor: 'pointer',
                  padding: '10px 0 0',
                  borderTop: '1px solid #E3DED3',
                  marginTop: 14,
                }}
              >
                <span style={{ color: '#FF5100', fontWeight: 600 }}>{peerAccGlyph}</span>{' '}
                How you compare to peers
              </div>

              {peerAccOpen && (
                <div style={{ paddingTop: 14 }}>
                  {contextCards.map((card) => (
                    <div
                      key={card.id}
                      style={{
                        border: '1px solid #E3DED3',
                        borderRadius: 3,
                        padding: '13px 15px',
                        margin: '0 0 10px',
                        background: '#FFFFFF',
                      }}
                    >
                      <div style={{ fontSize: 13, color: '#7A7166', margin: '0 0 4px' }}>
                        {card.short}
                      </div>
                      {card.isMulti && (
                        <>
                          {card.noAnswer && (
                            <div style={{ fontSize: 14, fontWeight: 500 }}>No answer</div>
                          )}
                          {card.rows?.map((row) => (
                            <div
                              key={row.value}
                              style={{ fontSize: 14, fontWeight: 500, margin: '0 0 4px' }}
                            >
                              {row.value}{' '}
                              <span
                                style={{
                                  fontFamily: "'Geist Mono', monospace",
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: '#140700',
                                }}
                              >
                                — {row.benchTxt} of peers also picked this
                              </span>
                            </div>
                          ))}
                        </>
                      )}
                      {card.isSingle && (
                        <>
                          <div style={{ fontSize: 14, fontWeight: 500, margin: '0 0 4px' }}>
                            {card.singleValue}
                          </div>
                          {card.singleHasBench && (
                            <div
                              style={{
                                fontFamily: "'Geist Mono', monospace",
                                fontSize: 13,
                                fontWeight: 600,
                                color: '#140700',
                              }}
                            >
                              {card.singleBenchTxt}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendation */}
            <div
              style={{
                border: '1px solid #E3DED3',
                borderLeft: '4px solid #FF5100',
                borderRadius: 3,
                padding: '18px 20px',
                background: '#FFFFFF',
              }}
            >
              <h4 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 400, color: '#7A7166' }}>
                Next: focus on{' '}
                <b style={{ fontWeight: 700, color: '#140700' }}>{recPillarName}</b>
              </h4>
              <p style={{ margin: 0, fontSize: 14, color: '#140700' }}>{recBody}</p>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                margin: '22px 0 8px',
              }}
            >
              <button
                className="btn-primary-hover"
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: '12px 22px',
                  borderRadius: 999,
                  whiteSpace: 'nowrap',
                  background: '#FF5100',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Talk to an expert about your assessment
              </button>
              <button
                onClick={onPrint}
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
                Print / save as PDF
              </button>
              <button
                onClick={reset}
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
                Start over
              </button>
            </div>
          </div>
        </div>

        {/* Footer / Methodology */}
        <footer
          style={{
            borderTop: '1px solid #E3DED3',
            padding: '24px 0 50px',
            marginTop: 0,
          }}
        >
          <div
            onClick={toggleFooterMethod}
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '.04em',
              color: '#7A7166',
              cursor: 'pointer',
              padding: '2px 0',
            }}
          >
            <span style={{ color: '#FF5100', fontWeight: 600 }}>{footerMethodGlyph}</span> How
            this score works
          </div>
          {footerMethodOpen && (
            <div
              style={{
                fontSize: 12.5,
                color: '#7A7166',
                lineHeight: 1.6,
                paddingTop: 10,
              }}
            >
              <p style={{ margin: '0 0 10px' }}>
                <b style={{ color: '#140700' }}>How your score is calculated.</b> Five questions,
                each drawn from a single Wakefield survey item, are scored on their original answer
                scale, and summed within their pillar, then normalized to 0–100. Your composite
                score is the weighted sum of three pillars: Budget and ownership (35%), Tools and
                detection (35%), People and training (30%). The three readiness tiers are: Exposed
                0–39, Reactive 40–69, Prepared 70–100.
              </p>
              <p style={{ margin: '0 0 10px' }}>
                <b style={{ color: '#140700' }}>On the weighting.</b> These weights and tier
                cutoffs are Pindrop's judgment about what matters most for deepfake readiness. The
                survey did not ask respondents to weight these factors against each other, and a
                different, equally reasonable framework could weight them differently.
                Reverse-coded questions are scored so that disagreement, not agreement, reflects
                stronger posture.
              </p>
              <p style={{ margin: '0 0 10px' }}>
                <b style={{ color: '#140700' }}>On the six questions shown as context, not scored.</b>{' '}
                Deepfake encounter, attack-surface breadth, consequences experienced, cost of
                attacks, and perceived existential risk each describe what already happened to a
                respondent or how they feel about risk—not an actionable capability the same way
                tooling or training is. These are useful for understanding how you stack up against
                the 250 U.S. security leaders who answered the same questions.
              </p>
              <p style={{ margin: '0 0 10px' }}>
                <b style={{ color: '#140700' }}>On the peer average.</b> The {peerAvg}/100 peer
                average is estimated from the survey's published question-level results, since the
                underlying data only reports aggregated answer frequencies, not each respondent's
                full set of answers.
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  color: '#7A7166',
                }}
              >
                Source: Wakefield Research for Pindrop · 250 U.S. security leaders at
                organizations of 1,000+ employees · fielded June 11–22, 2026 · margin of error
                ±6.2 pts. Pillars, weights, and tiers are the Pindrop framework applied to that
                data, not a statistical finding from it.
              </p>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
