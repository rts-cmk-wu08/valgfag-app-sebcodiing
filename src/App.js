import "./style.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import NavigationFooter from "./Components/NavigationFooter";

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <NavigationFooter />
    </div>
  );
}

export default App;
