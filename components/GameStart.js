import Image from "next/image";
import styles from "../styles/GameStart.module.scss";
import paperIcon from "../public/images/icon-paper.svg";
import scissorsIcon from "../public/images/icon-scissors.svg";
import rockIcon from "../public/images/icon-rock.svg";
import lizardIcon from "../public/images/icon-lizard.svg";
import spockIcon from "../public/images/icon-spock.svg";
import { useEffect, useState } from "react";

export default function GameStart({ handlePick, addLizardSpock }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 750);
  }, [addLizardSpock]);

  return (
    <div
      className={
        styles.root +
        (addLizardSpock ? " " + styles.root_ls : "") +
        (visible ? " " + styles.root_visible : "")
      }
    >
      <button
        data-testid="button-paper"
        className={
          styles.button +
          " " +
          styles.paper +
          (addLizardSpock ? " " + styles.button_ls + " " + styles.paper_ls : "")
        }
        onClick={() => handlePick("paper")}
      >
        <div>
          <Image src={paperIcon} alt="paper" />
        </div>
      </button>
      <button
        data-testid="button-scissors"
        className={
          styles.button +
          " " +
          styles.scissors +
          (addLizardSpock
            ? " " + styles.button_ls + " " + styles.scissors_ls
            : "")
        }
        onClick={() => handlePick("scissors")}
      >
        <div>
          <Image src={scissorsIcon} alt="scissors" />
        </div>
      </button>
      <button
        data-testid="button-rock"
        className={
          styles.button +
          " " +
          styles.rock +
          (addLizardSpock ? " " + styles.button_ls + " " + styles.rock_ls : "")
        }
        onClick={() => handlePick("rock")}
      >
        <div>
          <Image src={rockIcon} alt="rock" />
        </div>
      </button>
      {addLizardSpock && (
        <button
          data-testid="button-lizard"
          className={
            styles.button + " " + styles.button_ls + " " + styles.lizard
          }
          onClick={() => handlePick("lizard")}
        >
          <div>
            <Image src={lizardIcon} alt="lizard" />
          </div>
        </button>
      )}
      {addLizardSpock && (
        <button
          data-testid="button-spock"
          className={
            styles.button + " " + styles.button_ls + " " + styles.spock
          }
          onClick={() => handlePick("spock")}
        >
          <div>
            <Image src={spockIcon} alt="spock" />
          </div>
        </button>
      )}
    </div>
  );
}
