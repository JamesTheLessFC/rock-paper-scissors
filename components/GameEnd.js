import styles from "../styles/GameEnd.module.scss";
import Image from "next/image";
import paperIcon from "../public/images/icon-paper.svg";
import scissorsIcon from "../public/images/icon-scissors.svg";
import rockIcon from "../public/images/icon-rock.svg";
import lizardIcon from "../public/images/icon-lizard.svg";
import spockIcon from "../public/images/icon-spock.svg";

export default function GameEnd({
  userPick,
  housePick,
  winner,
  setGameOver,
  setUserPick,
  setHousePick,
}) {
  const handlePlayAgainClick = () => {
    setGameOver(false);
    setUserPick("");
    setHousePick("");
  };

  return (
    <div className={styles.root}>
      <div className={styles.picks}>
        <div className={styles.pickContainer}>
          <div
            className={
              styles.pick +
              " " +
              styles[userPick] +
              (winner === "user" ? " " + styles.winningPick : "")
            }
            id={styles.userPick}
          >
            <div className={styles.iconContainer}>
              <Image
                src={
                  userPick === "paper"
                    ? paperIcon
                    : userPick === "scissors"
                    ? scissorsIcon
                    : userPick === "rock"
                    ? rockIcon
                    : userPick === "lizard"
                    ? lizardIcon
                    : spockIcon
                }
                alt={userPick}
              />
            </div>
            <div className={styles.bgCircle + " " + styles.bgCircleFirst}></div>
            <div
              className={styles.bgCircle + " " + styles.bgCircleSecond}
            ></div>
            <div className={styles.bgCircle + " " + styles.bgCircleThird}></div>
            <div
              className={styles.bgCircle + " " + styles.bgCircleFourth}
            ></div>
          </div>
          <h3>You picked</h3>
        </div>
        <div className={styles.pickContainer}>
          <div
            className={
              styles.pick +
              " " +
              styles[housePick] +
              (winner === "house" ? " " + styles.winningPick : "")
            }
            id={styles.housePick}
          >
            <div className={styles.iconContainer}>
              <Image
                src={
                  housePick === "paper"
                    ? paperIcon
                    : housePick === "scissors"
                    ? scissorsIcon
                    : housePick === "rock"
                    ? rockIcon
                    : housePick === "lizard"
                    ? lizardIcon
                    : spockIcon
                }
                alt={housePick}
              />
            </div>
            <div className={styles.bgCircle + " " + styles.bgCircleFirst}></div>
            <div
              className={styles.bgCircle + " " + styles.bgCircleSecond}
            ></div>
            <div className={styles.bgCircle + " " + styles.bgCircleThird}></div>
            <div
              className={styles.bgCircle + " " + styles.bgCircleFourth}
            ></div>
          </div>
          <h3>The house picked</h3>
        </div>
      </div>
      <div className={styles.result}>
        <h1 data-testid="result">
          {!winner ? "Tie game" : winner === "user" ? "You win" : "You lose"}
        </h1>
        <button className={styles.button} onClick={handlePlayAgainClick}>
          Play Again
        </button>
      </div>
    </div>
  );
}
