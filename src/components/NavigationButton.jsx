import styles from "./NavigationButton.module.css";

function NavigationButton(props) {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button}>
        <img className={styles.img} src={props.path} alt="" />
      </button>
      <h3 className={styles.text}>{props.text}</h3>
    </div>
  );
}
export default NavigationButton;
