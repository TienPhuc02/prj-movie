import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header mb-10 py-10 text-white flex items-center justify-center gap-x-5">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home{" "}
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
