import useNumberListStore from "../../store/numberList";
import styles from './History.module.scss'

export default function History() {
  const { history } = useNumberListStore()

  return <div className={styles.wrapper}>
    {history.map((line) => <div className={styles.line}>{line}</div>)}
  </div>
}

