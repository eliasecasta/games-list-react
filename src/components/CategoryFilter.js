/* eslint-disable react/no-array-index-key, react/forbid-prop-types */
import { PropTypes } from 'prop-types';

const CategoryFilter = ({ filteredCategories, handleFilterChange }) => (
  <div className="text-center pb-3">
    <select
      className="form-select filter-list"
      onChange={(event) => handleFilterChange(event)}
    >
      <option value="All">All</option>
      {filteredCategories.map((category, i) => (
        <option key={i} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
);

CategoryFilter.propTypes = {
  filteredCategories: PropTypes.array.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
