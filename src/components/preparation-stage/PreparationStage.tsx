import { useCallback, useState } from 'react';
import styles from './PreparationStage.module.scss'
import useNumberListStore from '../../store/numberList';

type PreparationStageProps = {
  setNextStage: () => void;
}

function PreparationStage({ setNextStage }: PreparationStageProps) {
  const [value, setValue] = useState<string>('1')

  const { createNumberList } = useNumberListStore()

  const handleChangeCount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const handleChangeCountByBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValueN = parseFloat(e.target.value).toString()
    setValue(Number(inputValueN) <= 0 ? '1' : inputValueN)
  }, [])

  const handleClick = useCallback(() => {
    createNumberList(Number(value))
    setNextStage()
  }, [value, setNextStage, createNumberList])

  return (
    <div className={styles.wrapper}>
      введите количество чисел
      это определит сложность игры 
      <input
        type='number'
        value={value}
        onChange={handleChangeCount}
        onBlur={handleChangeCountByBlur}
        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
      />
      <button
        className="card"
        onClick={handleClick}
      >
        start
      </button>
    </div>
  )
}

export default PreparationStage;
