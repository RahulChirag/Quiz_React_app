import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        &copy; {new Date().getFullYear()} i-Life
      </div>
    </footer>
  );
}

export default Footer;
