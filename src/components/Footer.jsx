import Styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={Styles.footer}>
      &copy; {new Date().getFullYear()} i-Life
    </footer>
  );
}
export default Footer;
