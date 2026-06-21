import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await login({
        email: email.trim(),
        password,
      });

      navigate("/mypage");
    } catch (error) {
      console.error(error);
      setErrorMessage("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {isLoggingIn && (
        <div className={styles.header}>
          <button
            type="button"
            onClick={() => {
              setIsLoggingIn(false);
              setErrorMessage("");
              setPassword("");
            }}
            className={styles.backButton}
            aria-label="뒤로가기"
          >
            ‹
          </button>
        </div>
      )}

      <div className={styles.logoContainer}>
        <h1 className={styles.title}>밥풀</h1>

        <img
          src="/src/assets/images/auth_welcome.png"
          alt="밥풀"
          className={styles.logoImage}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        {!isLoggingIn && (
          <p className={styles.subtitle}>우리 학교 선후배 밥약 프로젝트</p>
        )}
      </div>

      <div className={styles.bottomSection}>
        {!isLoggingIn && (
          <div className={styles.buttonContainer}>
            <button
              className={styles.loginButton}
              type="button"
              onClick={() => setIsLoggingIn(true)}
            >
              로그인
            </button>
            <button
              className={styles.signupButton}
              type="button"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </div>
        )}

        {isLoggingIn && (
          <form className={styles.formContainer} onSubmit={handleLogin}>
            <h3 className={styles.stepTitle}>학교 이메일로 로그인</h3>

            <input
              className={styles.input}
              type="email"
              placeholder="학교 이메일 입력"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />

            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />

            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            <button
              className={styles.submitButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "로그인 중..." : "로그인"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
