// pages/xss.tsx
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Xss.module.css'; // Make sure to create a corresponding Xss.module.css file
import DOMPurify from 'dompurify';

const Xss: React.FC = () => {
  const [isXssEnabled, setXssEnabled] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [xssAttackResult, setXssAttackResult] = useState<JSX.Element | null>(null);

  const toggleXss = () => {
    setXssAttackResult(null);
    setXssEnabled(!isXssEnabled)
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input);
  };

  const simulateXssAttack = () => {
    const outputDiv = document.getElementById('xssOutput');

    if (isXssEnabled) {

      if (outputDiv) {
        outputDiv.innerHTML = userInput;
        const scripts = Array.from(outputDiv.querySelectorAll('script'));
        for (const oldScript of scripts) {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(attr => 
            newScript.setAttribute(attr.name, attr.value));
          newScript.textContent = oldScript.textContent;
          if (oldScript.parentNode) {
            oldScript.parentNode.replaceChild(newScript, oldScript);
          } else {
            console.error('No parent node found for script', oldScript);
          }
        }
        outputDiv.innerHTML = '';
      }

    } else {
      const sanitizedInput = sanitizeInput(userInput);
      setXssAttackResult(
        <div 
          style={{ color: 'black' }} 
          dangerouslySetInnerHTML={{ __html: sanitizedInput }} 
        />
      );
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>XSS Vulnerability Simulator</title>
        <meta name="description" content="Simulate an XSS attack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Cross-Site Scripting (XSS) Vulnerability</h1>

        <div className={styles.vulnerabilityControl}>
          <label className={styles.switch}>
            <input type="checkbox" checked={isXssEnabled} onChange={toggleXss} />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <div className={styles.labelText}>Enable/Disable XSS Vulnerability</div>
          <input
            type="text"
            placeholder="Enter script to simulate attack"
            onChange={handleUserInputChange}
            className={styles.userInput}
          />
          <button onClick={simulateXssAttack} className={styles.demonstrationButton}>
            Attempt XSS Attack
          </button>
          <div className={styles.xssOutput} id="xssOutput">
            {!isXssEnabled && xssAttackResult}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Xss;
