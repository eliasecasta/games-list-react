/* eslint-disable react/forbid-prop-types, jsx-a11y/anchor-is-valid */
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { recipeFilter } from '../reducers/recipeSlice';

const Meal = ({ meal: { idMeal, strMeal, strMealThumb } }) => {
  const dispatch = useDispatch();

  return (
    <Link to="/recipe" onClick={() => dispatch(recipeFilter(idMeal))}>
      <div
        data-testid="meal"
        className="img-meal-container"
        style={{
          backgroundImage: `url(${strMealThumb})`,
        }}
      >
        <h5 className="transparent-banner pl-3 py-2">{strMeal}</h5>
      </div>
    </Link>
  );
};

Meal.propTypes = {
  meal: PropTypes.object.isRequired,
};

export default Meal;
