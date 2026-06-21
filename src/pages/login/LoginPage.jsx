import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'; // CSS 모듈 연결

function LoginPage() {
  const navigate = useNavigate();

  // 로그인 절차를 제어할 상태값들
  const [isLoggingIn, setIsLoggingIn] = useState(false); // 이메일 입력창 활성화 여부
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);     // 인증번호 입력창 활성화 여부
  const [code, setCode] = useState("");

  const handleSendEmail = () => {
    if (email) {
      setEmailSent(true);
    }
  };

  const handleVerifyCode = () => {
    if (code.length === 4) {
      // 인증 성공 시 마이페이지로 이동!
      navigate('/mypage');
    } else {
      alert("인증번호 4자리를 올바르게 입력해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      {/* 뒤로가기 버튼 (이메일 입력 단계에서만 노출) */}
      {isLoggingIn && (
        <div className={styles.header}>
          <button 
            onClick={() => {
              setIsLoggingIn(false);
              setEmailSent(false);
            }} 
            className={styles.backButton}
          >
            ←
          </button>
        </div>
      )}

      {/* 상단 타이틀 & 이미지 영역 */}
      <div className={styles.logoContainer}>
        <h1 className={styles.title}>밥풀</h1>
        
        {/* 요청한 이미지 경로 유지 */}
        <img
          src="src/assets/images/auth_welcome.png"
          alt="Bapul Logo"
          className={styles.logoImage}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        
        {!isLoggingIn && <p className={styles.subtitle}>우리 학교 선후배 밀착 밥약 프로젝트</p>}
      </div>

      {/* 하단 동적 콘텐츠 영역 */}
      <div className={styles.bottomSection}>
        
        {/* 상태 1: 첫 진입 시 (버튼 2개) */}
        {!isLoggingIn && (
          <div className={styles.buttonContainer}>
            <button
              className={styles.loginButton}
              onClick={() => setIsLoggingIn(true)} // 로그인 입력 폼 띄우기
            >
              로그인
            </button>
            <button
              className={styles.signupButton}
              onClick={() => navigate('/signup')}
            >
              회원가입
            </button>
          </div>
        )}

        {/* 상태 2: 로그인 버튼 누른 후 (이메일 및 인증번호 입력) */}
        {isLoggingIn && (
          <div className={styles.formContainer}>
            <h3 className={styles.stepTitle}>학교 이메일 로그인</h3>
            
            <div className={styles.inlineInput}>
              <input
                className={styles.input}
                type="email"
                placeholder="학교 이메일 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailSent} // 이메일 발송 후에는 수정 불가
              />
              <button
                className={styles.inlineButton}
                onClick={handleSendEmail}
                disabled={!email || emailSent}
              >
                {emailSent ? "완료" : "발송"}
              </button>
            </div>

            {/* 이메일 발송 성공 시 인증번호 칸 띄우기 */}
            {emailSent && (
              <div className={styles.verifySection}>
                <h3 className={styles.stepTitle}>인증번호 입력</h3>
                <div className={styles.inlineInput}>
                  <input
                    className={styles.input}
                    type="text"
                    maxLength={4}
                    placeholder="인증번호 4자리 입력"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <button
                  className={styles.submitButton}
                  onClick={handleVerifyCode}
                  disabled={code.length !== 4}
                >
                  인증 및 로그인
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default LoginPage;