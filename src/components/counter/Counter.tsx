import { useCallback } from "react";
import useNumberListStore from "../../store/numberList";
import styles from './Counter.module.scss'

type CounterProps = {
  number: number;
  index: number;
}

export default function Counter({number, index}: CounterProps) {
  const { updateNumber } = useNumberListStore()

  const handleChangeNumber = useCallback((up?: boolean) => {
    if(up && number === 9) {
      updateNumber(index, 0) 
    } else if(!up && number === 0) {
      updateNumber(index, 9)
    } else {
      updateNumber(index, number + (up ? 1 : -1))
    }
  }, [updateNumber, index, number])

  return <div className={styles.counterWrapper}>
    <button className={`${styles.up} ${styles.arrow}`} onClick={() => handleChangeNumber(true)} />
    <span className={styles.int}>{number}</span>
    <button className={`${styles.down} ${styles.arrow}`} onClick={() => handleChangeNumber()} />
  </div>
}

