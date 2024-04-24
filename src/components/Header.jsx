import Logo from "../assets/illfelogo.png";
import "./Header.css";

function Header() {
  return (
    <header className="header-container">
      <img className="container-item" src={Logo} alt="Logo" />
      <div className="container-item-span"> </div>
      <button className="container-item" href="#">
        Login
      </button>
      <p className="container-item">|</p>
      <button className="container-item" href="#">
        SignUp
      </button>
    </header>
  );
}
export default Header;
