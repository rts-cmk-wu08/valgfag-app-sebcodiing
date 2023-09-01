import { Link } from "react-router-dom";
import "../style.css";

const Header = () => {
  return (
    <header>
        <div className="logo-container">
            <img className="logo" src="../uweatherlogo.png" alt="UWeather Logo" />
        </div>
    </header>
  );
};

export default Header;
