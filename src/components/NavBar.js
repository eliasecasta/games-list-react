/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const NavBar = () => {
  const { userName } = useSelector((state) => state.game);
  return (
    <nav
      data-testid="navbar"
      className="col-12 navbar d-flex justify-content-around"
    >
      <Menu>
        <Link id="home" className="menu-item" to="/">
          Home
        </Link>
        <Link id="favourites" className="menu-item" to="/meals">
          Dev Favourites
        </Link>
        <Link id="Log In" className="menu-item" to="/login">
          Log In
        </Link>
      </Menu>
      <Link to="/home">Games List</Link>
      <h5 className="navbar-username">{userName}</h5>
    </nav>
  );
};

export default NavBar;
