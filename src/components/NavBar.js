/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const NavBar = () => (
  <nav
    data-testid="navbar"
    className="col-12 navbar d-flex justify-content-around"
  >
    <Menu>
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="favourites" className="menu-item" href="/meals">
        Dev Favourites
      </a>
      <a id="Log In" className="menu-item" href="/login">
        Log In
      </a>
    </Menu>
    <Link to="/home">Games List</Link>
    <h5>Guest</h5>
  </nav>
);

export default NavBar;
