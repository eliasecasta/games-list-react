import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav data-testid="navbar" className="col-12 navbar d-flex justify-content-center">
    <Link to="/home">flavourbomb</Link>
  </nav>
);

export default NavBar;
