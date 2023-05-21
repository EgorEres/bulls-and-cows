import { useCallback, useState } from 'react'
import PreparationStage from './components/preparation-stage/PreparationStage';
import GameplayStage from './components/gameplay-stage/GameplayStage';
import ResultStage from './components/result-stage/ResultStage';

enum Stages {
  Preparation = 'preparation',
  Gameplay = 'gameplay',
  Result = 'result',
}

function App() {
  const [stage, setStage] = useState<Stages>(Stages.Gameplay);

  const setNextStage = useCallback(() => setStage((prev) => {
    if (prev === Stages.Result) return Stages.Gameplay
    if (prev === Stages.Gameplay) return Stages.Result

    return Stages.Preparation
  }), [])

  switch(stage) {
    case Stages.Preparation: return <PreparationStage setNextStage={setNextStage} />
    case Stages.Gameplay: return <GameplayStage setNextStage={setNextStage} />
    case Stages.Result: return <ResultStage setNextStage={setNextStage} />
    default: return <div>404</div>
  }
}

export default App
