/* eslint-disable react/forbid-prop-types */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { mealFilter } from '../reducers/recipeSlice';

const Category = ({ category: { strCategory, strCategoryThumb } }) => {
  const dispatch = useDispatch();

  return (
    <Link to="/meals" onClick={() => dispatch(mealFilter(strCategory))}>
      <div
        data-testid="category"
        className="img-category-container"
        style={{
          backgroundImage: `url(${strCategoryThumb})`,
        }}
      >
        <h5 className="transparent-banner pl-3 py-2">{strCategory}</h5>
      </div>
    </Link>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
};

export default Category;
