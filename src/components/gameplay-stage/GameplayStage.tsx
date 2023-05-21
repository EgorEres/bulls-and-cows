import { useCallback, useEffect, useState } from 'react';
import styles from './GameplayStage.module.scss'
import Counter from '../counter/Counter';
import useNumberListStore from '../../store/numberList';
import History from '../history/History';
import Rules from '../rules/Rules';

type GameplayStageProps = {
  setNextStage: () => void;
}

function GameplayStage({ setNextStage }: GameplayStageProps) {
  const [herd, upHerd] = useState({ bulls: 0, cows: 0 })
  const getCounter = useCallback((num: number, i: number) => <Counter key={i} number={num} index={i} />, [])
  const { numbers, secret, tryCount, createNumberList, addHistory } = useNumberListStore()

  useEffect(() => {
    createNumberList(6)
  }, [])

  const handleCheck = useCallback(() => {
    let bulls = 0;
    let cows = 0;
    const hash: { [key: string]: number } = {};

    for (let i = 0; i < secret.length; i++) {
      if (secret[i] === numbers[i].toString()) {
        bulls++;
      } else if (secret[i] in hash) hash[secret[i]]++;
      else hash[secret[i]] = 1;
    }

    for (let i = 0; i < numbers.length; i++) {
      if (secret[i] !== numbers[i].toString() && hash[numbers[i]]) {
        cows++;
        hash[numbers[i]]--;
      }
    }
    upHerd({ bulls, cows })
    addHistory(`${tryCount} - Bulls: ${bulls} Cows: ${cows} (${numbers.join('')})`)

    if(bulls === 6) {
      setNextStage()
    }
  }, [numbers, secret, tryCount, addHistory, setNextStage])

  return (
    <div className={styles.wrapper}>
      <Rules />
      <div className={styles.imgWrap}>
        <span className={styles.count}>{herd.bulls}</span>
        <img className={styles.bullImage} src='/bull.png' />
      </div>
      <div className={styles.imgWrap}>
        <span className={styles.count}>{herd.cows}</span>
        <img className={styles.cawImage} src='/caw.png' />
      </div>
      <div className={styles.gameplayBlock}>
        {numbers.map(getCounter)}
      </div>

      <button className={styles.checkBtn} onClick={handleCheck}>
        Проверить
      </button>

      <History />
    </div>
  )
}

export default GameplayStage;
