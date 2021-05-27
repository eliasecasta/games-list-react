/* eslint-disable react/forbid-prop-types */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { gameFilter } from '../reducers/gameSlice';

const Game = ({ category: { name, image, price } }) => {
  const dispatch = useDispatch();
  let freePrice = price;

  if (price === 0) {
    freePrice = 'Free!';
  } else {
    freePrice = `$ ${freePrice}`;
  }

  return (
    <Link to="/game-info" onClick={() => dispatch(gameFilter(name))}>
      <div
        data-testid="category"
        className="img-category-container"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <h5 className="transparent-banner py-2">{name}</h5>
        <h5 className="transparent-game-banner text-right py-2">{freePrice}</h5>
      </div>
    </Link>
  );
};

Game.propTypes = {
  category: PropTypes.object.isRequired,
};

export default Game;
