import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img id="site-logo" 
      className="logo" 
      src={logo} alt="Around the USA logo" />
    </header>
  );
}

export default Header;