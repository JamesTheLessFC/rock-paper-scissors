import styles from "../styles/Home.module.scss"
import { useState, useEffect } from "react"
import Header from "../components/Header"
import RulesButton from "../components/RulesButton"
import HeadComponent from "../components/HeadComponent"
import GameStart from "../components/GameStart"
import GameEnd from "../components/GameEnd"
import Rules from "../components/Rules"
import ModeCheckBox from "../components/ModeCheckBox"

const winningPicks = {
  rock: ["paper", "spock"],
  paper: ["scissors", "lizard"],
  scissors: ["rock", "spock"],
  lizard: ["scissors", "rock"],
  spock: ["lizard", "paper"],
}

export default function Home() {
  const [score, setScore] = useState(0);
  const [userPick, setUserPick] = useState("");
  const [housePick, setHousePick] = useState("");
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [addLizardSpock, setAddLizardSpock] = useState(false);
  const [picks, setPicks] = useState(["rock", "paper", "scissors"]);

  useEffect(() => {
    if (addLizardSpock) {
      setPicks(["rock", "paper", "scissors", "lizard", "spock"]);
    } else {
      setPicks(["rock", "paper", "scissors"]);
    }
  }, [addLizardSpock]);

  useEffect(() => {
    if (userPick && housePick) {
      if (userPick === housePick) {
        setWinner(false);
      } else if (winningPicks[housePick].includes(userPick)) {
        setWinner("user");
        setScore((prevScore) => {
          return ++prevScore;
        });
      } else {
        setWinner("house");
        setScore((prevScore) => {
          return --prevScore;
        });
      }
      setGameOver(true);
    }
  }, [userPick, housePick, setGameOver]);

  const getHousePick = () => {
    const randomInt = Math.floor(Math.random() * picks.length);
    return picks[randomInt];
  }

  const handlePick = (pick) => {
    setUserPick(pick);
    setHousePick(getHousePick());
  }

  const revealRules = () => {
    setShowRules(true);
  }

  const hideRules = () => {
    setShowRules(false);
  }

  const toggleLizardSpock = () => {
    setAddLizardSpock((prevAddLizardSpock) => {
      return !prevAddLizardSpock;
    });
  }

  return (
    <div className={styles.container}>
      <HeadComponent />
      <Header score={score} gameOver={gameOver} addLizardSpock={addLizardSpock}/>
      {gameOver ? <GameEnd userPick={userPick} housePick={housePick} winner={winner} setGameOver={setGameOver} setUserPick={setUserPick} setHousePick={setHousePick} /> : <GameStart handlePick={handlePick} addLizardSpock={addLizardSpock} />}
      <div className={styles.bottomRow}>
        <ModeCheckBox addLizardSpock={addLizardSpock} toggleLizardSpock={toggleLizardSpock} />
        <RulesButton revealRules={revealRules} />
      </div>
      {showRules && <Rules hideRules={hideRules} addLizardSpock={addLizardSpock} />}
    </div>
  )
}
