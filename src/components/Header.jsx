import Logo from "../assets/illfelogo.png";
import styles from "./Header.module.css";

function Header({ onLoginClick }) {
  return (
    <header className={styles.headerContainer}>
      <img className={styles.containerItem} src={Logo} alt="Logo" />
      <div className={styles.containerItemSpan}> </div>
      <button className={styles.containerItem} onClick={onLoginClick}>
        Login
      </button>
      <p className={styles.containerItem}>|</p>
      <button className={styles.containerItem} href="#">
        SignUp
      </button>
    </header>
  );
}
export default Header;
