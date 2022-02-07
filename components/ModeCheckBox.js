import styles from "../styles/ModeCheckBox.module.scss";
import checkMarkIcon from "../public/images/icon-check.svg";
import Image from "next/image";

export default function ModeCheckBox({ addLizardSpock, toggleLizardSpock }) {
  const handleChange = () => {
    toggleLizardSpock();
  };

  return (
    <label className={styles.checkbox}>
      <span className={styles.checkboxInput}>
        <input
          data-testid="mode-checkbox"
          type="checkbox"
          name="add lizard and spock"
          checked={addLizardSpock}
          onChange={handleChange}
        />
        <span
          data-testid="mode-checkbox-control"
          className={styles.checkboxControl}
        >
          <Image src={checkMarkIcon} alt="check icon" />
        </span>
      </span>
      <span className={styles.text}>Lizard &amp; Spock</span>
    </label>
  );
}
