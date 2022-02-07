import styles from "../styles/Header.module.scss";
import { useEffect, useState } from "react";

export default function Header({ score, gameOver, addLizardSpock }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, [addLizardSpock]);

  return (
    <div className={styles.titleScoreBox}>
      <div
        className={
          styles.title +
          (addLizardSpock ? " " + styles.title_ls : "") +
          (visible ? " " + styles.title_visible : "")
        }
      >
        <h3>Rock</h3>
        <h3>Paper</h3>
        <h3>Scissors</h3>
        {addLizardSpock && <h3>Lizard</h3>}
        {addLizardSpock && <h3>Spock</h3>}
      </div>
      <div className={styles.scoreCard}>
        <h5 className={styles.scoreCardHeader}>Score</h5>
        <h2
          data-testid="score"
          className={
            styles.score + (gameOver ? " " + styles.scoreGameOver : "")
          }
        >
          {score}
        </h2>
      </div>
    </div>
  );
}
