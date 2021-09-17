import styles from "../styles/Rules.module.scss"
import Image from "next/image"
import rulesImage from "../public/images/image-rules.svg"
import lizardSpockRulesImage from "../public/images/image-rules-bonus.svg"
import closeIcon from "../public/images/icon-close.svg"

export default function Rules({ hideRules, addLizardSpock }) {
  const handleClick = () => {
    hideRules();
  }

  return (
    <div className={styles.root}>
      <div className={styles.rulesContainer}>
        <h1>Rules</h1>
        <Image src={addLizardSpock ? lizardSpockRulesImage : rulesImage} alt="rules" />
        <button className={styles.button} onClick={handleClick}>
          <Image src={closeIcon} alt="close" />
        </button>
      </div>
    </div>
  );
}