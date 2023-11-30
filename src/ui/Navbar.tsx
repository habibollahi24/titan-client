import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import useTheme from "../hook/useTheme";

function Navbar() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-2 ">
      <Link to="/">
        <div className="w-28">
          <img src="/images/crop.png" alt="logo" className="grayscale " />
        </div>
      </Link>
      <ThemeIcon />
      <div>
        <button className="btn btn-secondary" onClick={logoutHandler}>
          log out
        </button>
      </div>
    </div>
  );
}

const ThemeIcon = () => {
  const [theme, onThemeHandler] = useTheme();
  return (
    <button
      onClick={onThemeHandler}
      className="cursor-pointer  rounded-full bg-gray-300 p-2 text-xl text-gray-700 duration-300 animate-in zoom-in"
    >
      {theme === "dark" ? <BsMoonFill /> : <BsFillSunFill />}
    </button>
  );
};

export default Navbar;
