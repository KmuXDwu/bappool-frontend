import { useState } from "react";
import styles from "./SignupPage.module.css";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [emailSent, setEmailSent] =
  useState(false);

  const [grade, setGrade] = useState("");
  const [status, setStatus] = useState("");

  const [interests, setInterests] = useState([]);

  const [studentCard, setStudentCard] = useState(null);

  const [role, setRole] = useState("");

  const totalStep = 6;

  const navigate = useNavigate();

  const interestList = [
    "학교 생활 🏫",
    "교환학생 / 대외활동 ✈️",
    "동아리 / 학회 🎒",
    "자취 / 통학 🚶‍♂️",
    "과제 / 팀플 ✍️",
    "학과 공부 💯",
    "복수전공/전과/편입 😎",
  ];

  const nextStep = () => {
    if (step < totalStep) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleInterest = (item) => {
    if (interests.includes(item)) {
      setInterests(
        interests.filter((v) => v !== item)
      );
    } else {
      setInterests([...interests, item]);
    }
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        {step > 1 && (
          <button
            onClick={prevStep}
            className={styles.backButton}
          >
            ←
          </button>
        )}

        <h2>회원가입</h2>
      </div>

      {/* 진행바 */}
    <div className={styles.progressBarWrap}>
    <div className={styles.progressBar}>
        <div
        className={styles.progress}
        style={{
            width: `${((step - 1) / (totalStep - 1)) * 100}%`,
        }}
        />

        <img
        src="src/assets/images/auth_progress.png"
        alt="캐릭터"
        className={styles.progressCharacter}
        style={{
            left: `${((step - 1) / (totalStep - 1)) * 100}%`,
        }}
        />
    </div>
    </div>
      {/* STEP 1 */}
    {step === 1 && (
    <>
        <h3 className={styles.stepTitle}>
        학교 이메일 인증
        </h3>

        <div className={styles.inlineInput}>
        <input
            className={styles.input}
            type="email"
            placeholder="학교 이메일 입력"
            value={email}
            onChange={(e) =>
            setEmail(e.target.value)
            }
        />

        <button
        className={styles.inlineButton}
        onClick={() => setEmailSent(true)}
        disabled={!email}
        >
        발송
        </button>
        </div>
        
        {emailSent && (
        <div className={styles.verifySection}>
            <h3 className={styles.stepTitle}>
            인증번호 입력
            </h3>
            <div className={styles.inlineInput}>
            <input
                className={styles.input}
                type="text"
                maxLength={6}
                placeholder="인증번호 입력"
                value={code}
                onChange={(e) =>
                setCode(e.target.value)
                }
            />

            <button
                className={styles.inlineButton}
            >
                인증
            </button>
            </div>

            <button
            className={styles.resendLink}
            onClick={() => {
                console.log("재요청");
            }}
            >
            인증번호 재요청
            </button>
        </div>
        )}
    </>
    )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h3 className={styles.stepTitle}>
            학년 선택
          </h3>

          <div
            className={
              styles.gradeContainer
            }
          >
            {[1, 2, 3, 4].map((item) => (
              <button
                key={item}
                className={`${
                  styles.gradeButton
                } ${
                  grade === item
                    ? styles.selected
                    : ""
                }`}
                onClick={() =>
                  setGrade(item)
                }
              >
                {item}학년
              </button>
            ))}
          </div>

          <h3
            className={styles.stepTitle}
            style={{
              marginTop: "28px",
            }}
          >
            재학 상태
          </h3>

          <div
            className={
              styles.statusContainer
            }
          >
        <button
        className={`${styles.statusButton} ${
            status === "재학" ? styles.selected : ""
        }`}
        onClick={() => setStatus("재학")}
        >
        재학
        </button>

        <button
        className={`${styles.statusButton} ${
            status === "휴학" ? styles.selected : ""
        }`}
        onClick={() => setStatus("휴학")}
        >
        휴학
        </button>
          </div>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h3 className={styles.stepTitle}>
            어떤 주제에 관심 있나요?
          </h3>

          <div
            className={
              styles.interestContainer
            }
          >
            {interestList.map((item) => (
              <button
                key={item}
                className={`${
                  styles.interestButton
                } ${
                  interests.includes(
                    item
                  )
                    ? styles.selected
                    : ""
                }`}
                onClick={() =>
                  toggleInterest(item)
                }
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <>
          <h3 className={styles.stepTitle}>
            학생증 인증
          </h3>

          <label
            className={styles.uploadBox}
          >
            {studentCard
              ? studentCard.name
              : "학생증 업로드"}

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) =>
                setStudentCard(
                  e.target.files?.[0] ||
                    null
                )
              }
            />
          </label>
        </>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <>
          <h3 className={styles.stepTitle}>
            밥약 목적
          </h3>

          <div
            className={
              styles.roleContainer
            }
          >
            <button
              className={`${
                styles.roleCard
              } ${
                role === "후배"
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                setRole("후배")
              }
            >
              <img
                src="src/assets/images/auth_j.png"
                alt="후배"
              />

              <p>선배님 저희 같이 밥 먹어요</p>
            </button>

            <button
              className={`${
                styles.roleCard
              } ${
                role === "선배"
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                setRole("선배")
              }
            >
              <img
                src="src/assets/images/auth_se.png"
                alt="선배"
              />

              <p>후배님 밥은 내가 사줄게요</p>
            </button>
          </div>
        </>
      )}

      {/* STEP 6 */}
      {step === 6 && (
        <>
          <img
            src="src/assets/images/auth_welcome.png"
            alt="회원가입 완료"
            style={{
              width: "100%",
              maxWidth: "240px",
              display: "block",
              margin: "0 auto",
              position: "relative",
                zIndex: 1
            }}
          />

          <h2
            style={{
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            가입을 축하합니다!
          </h2>

          <p
            style={{
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            나와 꼭 맞는 관심사를 가진<br></br>
            밥알을 찾아 말을 건네 보세요. 
          </p>

          <button
          className={styles.nextButton}
          onClick={() => navigate("/mypage")}
          >
          밥약 하러 가기
          </button>
        </>
      )}

      {/* 공통 다음 버튼 */}
      {step !== 6 && (
        <button
          className={styles.nextButton}
          onClick={nextStep}
        >
          다음
        </button>
      )}
    </div>
  );
}

export default SignupPage;