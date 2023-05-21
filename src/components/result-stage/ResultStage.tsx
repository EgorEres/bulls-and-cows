import styles from './ResultStage.module.scss'
import useNumberListStore from '../../store/numberList';
import { useCallback } from 'react';

type ResultStageProps = {
  setNextStage: () => void;
}

function ResultStage({ setNextStage }: ResultStageProps) {
  const { tryCount, secret, reset } = useNumberListStore()

  const handleClick = useCallback(() => {
    reset()
    setNextStage()
  }, [reset, setNextStage])

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <h1>Поздравляю!</h1>
        <h3>Секретное число {secret}</h3>
        <h3>Вы нашли его за {tryCount} ходов</h3>

        <button className={styles.playBtn} onClick={handleClick}>Играть снова</button>
      </div>
    </div>
  )
}

export default ResultStage;
