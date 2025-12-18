import React, { useState } from 'react';
import styles from './Quiz.module.css';

const questions = [
  {q: 'Что делает команда pwd?', a: ['Показывает список процессов', 'Показывает путь к текущему каталогу', 'Удаляет каталог', 'Создаёт файл'], c: 1},
  {q: 'Какой шорткод перемещает на один каталог вверх?',a: ['cd ~', 'cd /', 'cd ..', 'cd -'], c: 2},
  {q: 'Какая команда выводит содержимое файла?', a: ['ls', 'cat', 'mv', 'touch'], c: 1},
  {q: 'Какая команда используется для поиска текста внутри файла?',a: ['grep', 'find', 'locate', 'echo'],c: 0},
  {q: 'Что делает команда chmod?',a: ['Меняет владельца файла', 'Меняет права доступа', 'Удаляет файл', 'Показывает историю команд'],c: 1},
  {q: 'Какой UID у пользователя root?',a: ['1', '1000', '0', '777'],c: 2},
  {q: 'Что означает право x для файла?', a: ['Чтение', 'Запись', 'Выполнение', 'Сжатие'], c: 2},
  {q: 'Какая команда создаёт новый каталог?', a: ['mkdir', 'touch', 'cp', 'mv'], c: 0},
  {q: 'Какая команда показывает подробную информацию о правах файла?', a: ['stat', 'df', 'uname', 'jobs'], c: 0},
  {q: 'Что делает команда chown?',a: ['Меняет владельца файла', 'Переименовывает файл', 'Показывает процессы', 'Архивирует файлы'], c: 0}
];


export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [locked, setLocked] = useState(false);

  function choose(i) {
    if (locked) return;
    setClicked(i);
    setLocked(true);

    setTimeout(() => {
      const updated = [...answers, i];
      setAnswers(updated);
      setClicked(null);
      setLocked(false);

      if (step + 1 < questions.length) setStep(step + 1);
      else setFinished(true);
    }, 1200);
  }

  const score = answers.filter((a, i) => a === questions[i].c).length;

  if (finished) {
    return (
      <div className={styles.quizBox}>
        <h2 className={styles.title}>Результат</h2>
        <p className={styles.score}>{score} из {questions.length}</p>
      </div>
    );
  }

  return (
    <div className={styles.quizBox}>
      <h3 className={styles.question}>{questions[step].q}</h3>
      <div className={styles.answers}>
        {questions[step].a.map((text, i) => {
          let cls = styles.btn;

          if (clicked !== null) {
            if (i === questions[step].c) cls += ` ${styles.correctFinal}`;
            if (i === clicked && i !== questions[step].c) cls += ` ${styles.wrongFinal}`;
          }

          if (clicked === i) {
            cls += i === questions[step].c ? ` ${styles.correct}` : ` ${styles.wrong}`;
          }

          return (
            <button key={i} className={cls} onClick={() => choose(i)}>
              {text}
            </button>
          );
        })}
      </div>
      <p className={styles.progress}>{step + 1} / {questions.length}</p>
    </div>
  );
}
