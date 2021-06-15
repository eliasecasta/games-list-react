/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { signOut } from '../reducers/gameSlice';

const NavBar = () => {
  const dispatch = useDispatch();

  const { userName } = useSelector((state) => state.game);
  let signInLink;
  let signOutLink;
  let signUpLink;

  if (userName === 'Guest') {
    signOutLink = '';
    signInLink = (
      <Link id="Sign In" className="game-item" to="/signin">
        Sign In
      </Link>
    );
    signUpLink = (
      <Link id="Sign Up" className="game-item" to="/signup">
        Sign Up
      </Link>
    );
  } else {
    signInLink = (
      <Link
        id="Sign Out"
        className="game-item"
        onClick={() => dispatch(() => dispatch(signOut()))}
        to="/"
      >
        Sign Out
      </Link>
    );
  }
  return (
    <nav
      data-testid="navbar"
      className="col-12 navbar d-flex justify-content-around"
    >
      <Menu collapseOnSelect>
        <Link id="home" className="game-item" to="/">
          Home
        </Link>
        <Link id="favourites" className="game-item" to="/favourites">
          Dev Favourites
        </Link>
        {signInLink}
        {signUpLink}
        {signOutLink}
      </Menu>
      <Link to="/home">Games List</Link>
      <h5 className="navbar-username">{userName}</h5>
    </nav>
  );
};

export default NavBar;
