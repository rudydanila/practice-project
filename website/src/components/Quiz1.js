import React, { useState } from 'react';
import styles from './Quiz.module.css';

const questions = [
  { q: 'Что такое UNIX?', a: ['Графическая оболочка', 'Семейство многозадачных ОС', 'Дистрибутив Linux', 'Ядро Linux'], c: 1 },
  { q: 'Что такое Linux?', a: ['Проприетарная версия UNIX', 'Открытая реализация идей UNIX', 'Программа для файлов', 'Только GUI'], c: 1 },
  { q: 'Что такое дистрибутив Linux?', a: ['Только ядро', 'Набор пакетов и ядра', 'Только GUI', 'Только shell'], c: 1 },
  { q: 'UID суперпользователя root:', a: ['1', '1000', '0', '777'], c: 2 },
  { q: 'Что такое shell?', a: ['GUI', 'Интерпретатор команд', 'Файловая система', 'Менеджер пакетов'], c: 1 },
  { q: 'Формат пакетов Debian‑based:', a: ['.rpm', '.pkg', '.deb', '.tar'], c: 2 },
  { q: 'Что делает команда ls -l /?', a: ['Удаляет каталог', 'Показывает содержимое /', 'Меняет каталог', 'Запускает GUI'], c: 1 },
  { q: 'XWindow (X11) — это:', a: ['Менеджер пакетов', 'Система вывода графики', 'Файловая система', 'Интерпретатор'], c: 1 },
  { q: 'Недостаток виртуальной машины:', a: ['Нет GUI', 'Низкая производительность', 'Нельзя удалить', 'Нет сети'], c: 1 },
  { q: 'Что представляет собой ISO‑образ Linux‑дистрибутива?', a: ['Архив с пользовательскими настройками', 'Образ диска, содержащий структуру ОС и загрузочные записи',
                                                                   'Файл, который запускает виртуальную машину', 'Графическая оболочка для установки системы'], c: 1 }
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
