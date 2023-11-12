import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Security Vulnerabilities Simulator</title>
        <meta name="description" content="Simulate and learn about common web security vulnerabilities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Security Vulnerabilities Simulator</h1>
        <p className={styles.description}>
          Click on a vulnerability below to simulate and understand how it works.
        </p>

        <div className={styles.grid}>
          <Link href="/xss">
            <div className={styles.card}>
              <h2>Cross-Site Scripting (XSS) &rarr;</h2>
              <p>Simulate and understand XSS attacks.</p>
            </div>
          </Link>
          
          <Link href="/broken-access-control">
            <div className={styles.card}>
              <h2>Broken Access Control &rarr;</h2>
              <p>Explore and prevent broken access control vulnerabilities.</p>
            </div>
          </Link>
          
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Please note: This application is designed for educational purposes only and does not
          facilitate real-world attacks.
        </p>
      </footer>
    </div>
  );
};

export default Home;
