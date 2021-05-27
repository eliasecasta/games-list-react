/* eslint-disable react/forbid-prop-types, jsx-a11y/anchor-is-valid */
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { gameFilter } from '../reducers/recipeSlice';

const Meal = ({ meal: { name, image, price } }) => {
  const dispatch = useDispatch();
  let freePrice = price;

  if (price === 0) {
    freePrice = 'Free!';
  } else {
    freePrice = `$ ${freePrice}`;
  }

  return (
    <Link to="/recipe" onClick={() => dispatch(gameFilter(name))}>
      <div
        data-testid="meal"
        className="img-meal-container"
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

Meal.propTypes = {
  meal: PropTypes.object.isRequired,
};

export default Meal;
