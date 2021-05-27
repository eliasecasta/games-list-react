/* eslint-disable react/forbid-prop-types */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { gameFilter } from '../reducers/recipeSlice';

const Category = ({ category: { name, image, price } }) => {
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

Category.propTypes = {
  category: PropTypes.object.isRequired,
};

export default Category;
