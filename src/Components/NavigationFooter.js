import { NavLink } from "react-router-dom";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { GiRadarSweep } from "react-icons/gi";
import { PiNewspaperClipping } from "react-icons/pi";
import "../style.css";

const NavigationFooter = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <TiWeatherPartlySunny />
            </NavLink>
            <NavLink to="/radar">
              <GiRadarSweep />
            </NavLink>
            <NavLink to="/news">
              <PiNewspaperClipping />
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default NavigationFooter;
