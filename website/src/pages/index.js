import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Layout title="Операционные системы" description="Учебный портал по Linux и UNIX">
      <main className={styles.hero}>
        <div className={styles.parallaxLayer} ref={parallaxRef}>
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>
          <div className={styles.blob3}></div>
        </div>
        <div className={styles.glassBox}>
          <h1 className={styles.title}>Операционные системы</h1>
          <p className={styles.subtitle}>Учебный портал по Linux</p>

          <div className={styles.buttonGrid}>
          <div>
            <Link className={styles.button} to="docs/sidebar1/ОС Linux и семейство UNIX. Дистрибутивы Linux">Глава 1</Link>
            <p></p>
            <p className={styles.desc}>Введение в ОС Linux. Основные понятия, инсталляция</p>
          </div>

          <div>
            <Link className={styles.button} to="docs/sidebar2/Администрирование ОС">Глава 2</Link>
            <p></p>
            <p className={styles.desc}>Администрирование, работа с терминалом</p>
          </div>

          <div>
            <Link className={styles.button} to="docs/sidebar3/Настройка ОС">Глава 3</Link>
            <p></p>
            <p className={styles.desc}>Процессы, управление ресурсами, файловой системой.</p>
          </div>
        </div>
        </div>
      </main>
    </Layout>
  );
}
