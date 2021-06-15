/* eslint-disable react/no-array-index-key, react/forbid-prop-types */
import { PropTypes } from 'prop-types';

const GameFilter = ({ filteredGames, handleFilterChange }) => (
  <div className="text-center pb-3">
    <select
      className="form-select filter-list"
      onChange={(event) => handleFilterChange(event)}
    >
      <option value="All">All</option>
      {filteredGames.map((game, i) => (
        <option key={i} value={game}>
          {game}
        </option>
      ))}
    </select>
  </div>
);

GameFilter.propTypes = {
  filteredGames: PropTypes.array.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default GameFilter;
