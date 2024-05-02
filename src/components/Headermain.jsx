import PropTypes from "prop-types";
import Styles from "./Headermain.module.css";

function Headermain(props) {
  const mainPageHeader = (
    <header className={Styles.header}>
      <img
        className={Styles.logo}
        src="/src/assets/iLifelogo.png"
        alt="i-life logo"
      />
      <div className={Styles.heading}></div>
    </header>
  );

  const PageHeader = (
    <header className={Styles.header}>
      <img
        className={Styles.logo}
        src="/src/assets/iLifelogo.png"
        alt="i-life logo"
      />
      <h2 className={Styles.heading}>Gamified Curriculum</h2>
      <a
        className={Styles.link}
        href="https://app.ilifegenie.com/chat/20240223050025ilkTlGyK0vpf6bUS/1"
      >
        <img className={Styles.linkimage} src="/src/assets/genie.png" alt="" />
      </a>
    </header>
  );

  return props.onMainpage ? mainPageHeader : PageHeader;
}

Headermain.prototypes = {
  onMainpage: PropTypes.bool,
};

export default Headermain;
