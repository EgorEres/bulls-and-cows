import styles from './Rules.module.scss'

import { memo, useState } from "react";

const Rules = memo(() => {
  const [open, setOpen] = useState(false)

  return <div className={styles.wrapper}>
    <button className={styles.ruleBtn} onClick={() => setOpen((prev) => !prev)}>!</button>

    {open && <div className={styles.modal} onClick={() => setOpen((prev) => !prev)}>
      <div className={styles.rules}>
        <h3>Правила</h3>
        <p>Вам необходимо узнать секретное значение - последовательность из 6 чисел</p>
        <p>Выставите значение и нажимаете кнопку проверить</p>
        <p>Количество быков означает количество правильно угаданных цифр в правильном месте</p>
        <p>Количество коров означает количество правильно угаданных цифр но их позиция неизвестна</p>
        <p>
          Например: если вы видите одного быка и одну корову - это означает что одна цифра (бык) из шести верная 
          и ее позиция то-же, плюс есть еще одна цифра (корова) которая есть в секретном значении 
          но в вашем числе ее позиция не верна
        </p>
        <p>Цель: найти секретное число за наименьшее количество попыток!</p>
      </div>
    </div>}
  </div>
})

export default Rules;
