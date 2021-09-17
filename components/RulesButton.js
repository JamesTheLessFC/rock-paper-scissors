import styles from "../styles/RulesButton.module.scss"

export default function RulesButton({ revealRules }) {
  const handleClick = () => {
    revealRules();
  }

  return (
    <button className={styles.rulesButton} onClick={handleClick} >Rules</button>
  );
}