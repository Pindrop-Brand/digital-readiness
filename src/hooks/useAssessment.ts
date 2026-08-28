import { useState, useCallback } from 'react';
import {
  PILLARS,
  CONTEXT_Q,
  getTier,
  TAGLINE,
  REC_BY_PILLAR,
  buildPages,
  pillarNorm,
  fullComposite,
  pageIsComplete,
} from '../data/assessment';
import type {
  Stage,
  AnswerValue,
  ContextValue,
  OptionView,
  ContextQuestionView,
  PillarBar,
  ContextCard,
} from '../types';

function optStyle(selected: boolean) {
  return {
    border: selected ? '#FF5100' : '#E3DED3',
    bg: selected ? '#FFF1E8' : '#FFFFFF',
    valBorder: selected ? '#FF5100' : '#E3DED3',
    valBg: selected ? '#FF5100' : '#FFFFFF',
    valColor: selected ? '#FFFFFF' : '#7A7166',
  };
}

const BTN_ACTIVE = { bg: '#140700', color: '#FFFFFF' };
const BTN_DISABLED = { bg: '#DAD5C9', color: '#93897A' };

export function useAssessment(peerAvgComposite = 55, autoAdvance = true) {
  const [stage, setStage] = useState<Stage>('cover');
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [context, setContext] = useState<Record<string, ContextValue>>({});
  const [openAcc, setOpenAcc] = useState<Record<string, boolean>>({});

  const toggleAcc = useCallback((id: string) => {
    setOpenAcc((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const pages = buildPages();

  const doAutoAdvance = useCallback(
    (updatedAnswers: Record<string, AnswerValue>, currentPageIdx: number) => {
      if (!autoAdvance) return;
      const isLast = currentPageIdx === pages.length - 1;
      const pg = pages[Math.min(currentPageIdx, pages.length - 1)];
      setTimeout(() => {
        if (isLast) {
          if (pageIsComplete(pg, updatedAnswers)) setStage('results');
        } else if (pageIsComplete(pg, updatedAnswers)) {
          setCurrentPage((p) => p + 1);
        }
      }, 220);
    },
    [autoAdvance, pages],
  );

  const startAssessment = useCallback(() => setStage('quiz'), []);

  const selectPillarAnswer = useCallback(
    (qid: string, value: number | null, isNA: boolean) => {
      setAnswers((prev) => {
        const newVal: AnswerValue = isNA ? 'NA' : value;
        const next: Record<string, AnswerValue> = { ...prev, [qid]: newVal };
        doAutoAdvance(next, currentPage);
        return next;
      });
    },
    [currentPage, doAutoAdvance],
  );

  const selectContextSingle = useCallback((qid: string, value: string) => {
    setContext((prev) => ({ ...prev, [qid]: value }));
  }, []);

  const toggleContextMulti = useCallback((qid: string, value: string) => {
    setContext((prev) => {
      const cur = Array.isArray(prev[qid]) ? [...(prev[qid] as string[])] : [];
      const idx = cur.indexOf(value);
      if (idx >= 0) cur.splice(idx, 1);
      else cur.push(value);
      return { ...prev, [qid]: cur };
    });
  }, []);

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) setCurrentPage((p) => p + 1);
    else setStage('results');
  }, [currentPage, pages.length]);

  const goBack = useCallback(() => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  }, [currentPage]);

  const seeResults = useCallback(() => setStage('results'), []);
  const onPrint = useCallback(() => window.print(), []);
  const reset = useCallback(() => {
    setStage('cover');
    setCurrentPage(0);
    setAnswers({});
    setContext({});
    setOpenAcc({});
  }, []);

  // Derived view state
  const cp = Math.min(currentPage, pages.length - 1);
  const pg = pages[cp];
  const isContextPage = pg.kind === 'context-all';
  const isPillarPage = pg.kind === 'pillar';
  const complete = pageIsComplete(pg, answers);
  const isLast = cp === pages.length - 1;

  // Pillar question view
  let currentStem = '';
  let currentOpts: OptionView[] = [];
  let naLabel: OptionView | null = null;

  if (isPillarPage && pg.question && pg.pillar) {
    const q = pg.question;
    currentStem = q.stem;
    currentOpts = q.opts.map((o: string, v: number) => {
      const sel = answers[q.id] === v;
      return {
        label: o,
        symbol: String(v),
        onClick: () => selectPillarAnswer(q.id, v, false),
        ...optStyle(sel),
      };
    });
    if (q.naLabel) {
      const selNA = answers[q.id] === 'NA';
      naLabel = {
        label: q.naLabel,
        symbol: '—',
        onClick: () => selectPillarAnswer(q.id, null, true),
        ...optStyle(selNA),
      };
    }
  }

  // Context questions view
  const contextQuestions: ContextQuestionView[] = isContextPage
    ? CONTEXT_Q.map((q) => {
        if (q.multi) {
          const arr = Array.isArray(context[q.id]) ? (context[q.id] as string[]) : [];
          return {
            id: q.id,
            stem: q.stem,
            opts: q.opts.map((o) => {
              const sel = arr.includes(o);
              return {
                label: o,
                symbol: '✓',
                onClick: () => toggleContextMulti(q.id, o),
                ...optStyle(sel),
              };
            }),
          };
        }
        return {
          id: q.id,
          stem: q.stem,
          opts: q.opts.map((o) => {
            const sel = context[q.id] === o;
            return {
              label: o,
              symbol: String(q.opts.indexOf(o)),
              onClick: () => selectContextSingle(q.id, o),
              ...optStyle(sel),
            };
          }),
        };
      })
    : [];

  // Navigation state
  const showBack = cp > 0;
  const showContinue = isContextPage || (isPillarPage && !isLast && !autoAdvance);
  const showSeeResults = isLast;
  const showSkip = isContextPage;
  const seeResultsDisabled = isLast && !complete;
  const continueDisabled = isPillarPage && !complete;
  const hint = isPillarPage
    ? autoAdvance
      ? 'Select an answer to continue.'
      : 'Select an answer, then continue.'
    : '';

  // Results state
  const composite = fullComposite(answers);
  const [tierName, tierColor] = getTier(composite);
  const isExposed = tierName === 'Exposed';
  const isReactive = tierName === 'Reactive';
  const isPrepared = tierName === 'Prepared';
  const scoreRounded = Math.round(composite);
  const diff = scoreRounded - peerAvgComposite;
  const diffTxt =
    diff === 0
      ? 'right at the peer average'
      : diff > 0
        ? `${Math.abs(diff)} points above the peer average`
        : `${Math.abs(diff)} points below the peer average`;

  let lowest = { n: 101, name: '' };
  const pillarBars: PillarBar[] = PILLARS.map((p) => {
    const norm = pillarNorm(p, answers);
    const nrm = norm == null ? 0 : norm;
    if (nrm < lowest.n) lowest = { n: nrm, name: p.name };
    return {
      name: p.name,
      meaning: p.meaning,
      color: p.color,
      value: Math.round(nrm),
      width: Math.round(nrm),
      low: nrm < 50,
    };
  });

  const contextCards: ContextCard[] = CONTEXT_Q.map((q) => {
    const val = context[q.id];
    if (q.multi) {
      const chosen = Array.isArray(val) && val.length ? (val as string[]) : null;
      return {
        id: q.id,
        short: q.short,
        isMulti: true,
        isSingle: false,
        noAnswer: !chosen,
        rows: chosen
          ? chosen.map((v) => ({
              value: v,
              benchTxt: q.bench[v] != null ? `${Math.round(q.bench[v])}%` : '',
            }))
          : [],
      };
    }
    const bench = val != null ? q.bench[val as string] : null;
    return {
      id: q.id,
      short: q.short,
      isMulti: false,
      isSingle: true,
      singleValue: (val as string) || 'No answer',
      singleHasBench: bench != null,
      singleBenchTxt: bench != null ? `${Math.round(bench)}% of peers` : '',
    };
  });

  return {
    // Stage
    stage,
    startAssessment,
    onPrint,
    reset,

    // Quiz navigation
    currentPage: cp,
    totalPages: pages.length,
    progressStepText: `Step ${cp + 1} of ${pages.length}`,
    progressPercent: pages.length ? Math.round(((cp + 1) / pages.length) * 100) : 0,
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
    continueBg: continueDisabled ? BTN_DISABLED.bg : BTN_ACTIVE.bg,
    continueColor: continueDisabled ? BTN_DISABLED.color : BTN_ACTIVE.color,
    seeResultsBg: seeResultsDisabled ? BTN_DISABLED.bg : '#FF5100',
    seeResultsColor: seeResultsDisabled ? BTN_DISABLED.color : '#FFFFFF',
    onBack: goBack,
    onContinue: goNext,
    onSeeResults: seeResults,
    onSkip: goNext,

    // Accordions
    coverDisclaimerOpen: !!openAcc['coverDisc'],
    toggleCoverDisc: () => toggleAcc('coverDisc'),
    coverDiscGlyph: openAcc['coverDisc'] ? '−' : '+',
    pageMethodOpen: !!openAcc['pageMethod'],
    togglePageMethod: () => toggleAcc('pageMethod'),
    pageMethodGlyph: openAcc['pageMethod'] ? '−' : '+',
    footerMethodOpen: !!openAcc['footerMethod'],
    toggleFooterMethod: () => toggleAcc('footerMethod'),
    footerMethodGlyph: openAcc['footerMethod'] ? '−' : '+',
    peerAccOpen: !!openAcc['peerAcc'],
    togglePeerAcc: () => toggleAcc('peerAcc'),
    peerAccGlyph: openAcc['peerAcc'] ? '−' : '+',

    // Results
    tierName,
    tierColor,
    isExposed,
    isReactive,
    isPrepared,
    scoreRounded,
    tagline: TAGLINE[tierName],
    diffTxt,
    peerAvg: peerAvgComposite,
    pillarBars,
    contextCards,
    recPillarName: lowest.name,
    recBody: REC_BY_PILLAR[lowest.name] || '',
  };
}
