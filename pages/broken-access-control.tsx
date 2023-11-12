import { useState, FormEvent, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../styles/BrokenAccessControl.module.css';

const BrokenAccessControl = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.role === 'admin') {
        router.push('/adminPage');
      } else {
        router.push('/userPage');
      }
    }
  }, [session, status, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const [isAttackEnabled, setIsAttackEnabled] = useState(false);
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = event.target.checked;
    setIsAttackEnabled(isEnabled);
    localStorage.setItem('isAttackEnabled', String(isEnabled));
  };

  if (status === 'authenticated') {
    return null;
  }

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Log In</button>
      </form>
      <div className={styles.attackToggle}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isAttackEnabled}
            onChange={handleToggle}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.toggleLabel}>
          {isAttackEnabled ? 'Attack Enabled' : 'Attack Disabled'}
        </span>
      </div>
    </div>
  );
};

export default BrokenAccessControl;
