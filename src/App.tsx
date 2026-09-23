import { useAssessment } from './hooks/useAssessment';
import { CoverPage } from './components/CoverPage';
import { QuizPage } from './components/QuizPage';
import { ResultsPage } from './components/ResultsPage';
import { GateModal } from './components/GateModal';

export function App() {
  const state = useAssessment(55, true);

  return (
    <div
      style={{
        fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        background: '#FBF9F5',
        color: '#140700',
        minHeight: '100vh',
        lineHeight: 1.55,
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {state.stage === 'cover' && (
        <CoverPage
          startAssessment={state.startAssessment}
          coverDisclaimerOpen={state.coverDisclaimerOpen}
          toggleCoverDisc={state.toggleCoverDisc}
          coverDiscGlyph={state.coverDiscGlyph}
        />
      )}

      {state.stage === 'quiz' && (
        <QuizPage
          progressStepText={state.progressStepText}
          progressPercent={state.progressPercent}
          isPillarPage={state.isPillarPage}
          isContextPage={state.isContextPage}
          currentStem={state.currentStem}
          currentOpts={state.currentOpts}
          naLabel={state.naLabel}
          contextQuestions={state.contextQuestions}
          showBack={state.showBack}
          showContinue={state.showContinue}
          showSeeResults={state.showSeeResults}
          seeResultsDisabled={state.seeResultsDisabled}
          continueDisabled={state.continueDisabled}
          hint={state.hint}
          continueBg={state.continueBg}
          continueColor={state.continueColor}
          seeResultsBg={state.seeResultsBg}
          seeResultsColor={state.seeResultsColor}
          onBack={state.onBack}
          onContinue={state.onContinue}
          onSeeResults={state.onSeeResults}
          pageMethodOpen={state.pageMethodOpen}
          togglePageMethod={state.togglePageMethod}
          pageMethodGlyph={state.pageMethodGlyph}
        />
      )}

      {state.gateOpen && (
        <GateModal onComplete={state.completeGate} onDismiss={state.dismissGate} />
      )}

      {state.stage === 'results' && (
        <ResultsPage
          tierName={state.tierName}
          isExposed={state.isExposed}
          isReactive={state.isReactive}
          isPrepared={state.isPrepared}
          scoreRounded={state.scoreRounded}
          tagline={state.tagline}
          diffTxt={state.diffTxt}
          peerAvg={state.peerAvg}
          pillarBars={state.pillarBars}
          contextCards={state.contextCards}
          recPillarName={state.recPillarName}
          recBody={state.recBody}
          isPerfect={state.isPerfect}
          peerAccOpen={state.peerAccOpen}
          togglePeerAcc={state.togglePeerAcc}
          peerAccGlyph={state.peerAccGlyph}
          footerMethodOpen={state.footerMethodOpen}
          toggleFooterMethod={state.toggleFooterMethod}
          footerMethodGlyph={state.footerMethodGlyph}
          onPrint={state.onPrint}
          reset={state.reset}
        />
      )}
    </div>
  );
}
