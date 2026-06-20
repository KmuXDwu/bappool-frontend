import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'; // Create a CSS Module for styles

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        {/* Replace with your actual image/logo file */}
        <img
          src="src/assets/images/logo.png" // Adjust path as needed
          alt="Bapul Logo"
          className={styles.logoImage}
        />
        <h1 className={styles.title}>밥풀</h1>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.loginButton}
          onClick={() => navigate('/login')} // Replace with your actual login route
        >
          로그인
        </button>
        <button
          className={styles.signupButton}
          onClick={() => navigate('/signup')} // Replace with your actual signup route
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default LoginPage;