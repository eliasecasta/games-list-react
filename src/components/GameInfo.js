/* eslint-disable no-unused-vars */
/* eslint-disable max-len, operator-linebreak, object-curly-newline, react/forbid-prop-types, jsx-a11y/anchor-is-valid */
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  setFavourite,
  deleteFavourite,
  selectAllFavourites,
} from '../reducers/gameSlice';

const GameInfo = ({ game: { name, image, price, description } }) => {
  const dispatch = useDispatch();
  const favourites = useSelector(selectAllFavourites);

  let freePrice;
  let favButton;
  const favExists = [];

  if (price === 0) {
    freePrice = 'Free!';
  } else {
    freePrice = `$ ${price}`;
  }

  if (favourites !== undefined) {
    favourites.forEach((favourite) => {
      if (favourite.name === name) {
        favExists.push(true);
      } else {
        favExists.push(false);
      }
    });
  }

  if (favExists.includes(true)) {
    favButton = (
      <button
        type="button"
        className="fav-btn btn btn-danger"
        onClick={() => dispatch(deleteFavourite())}
      >
        Unfavourite
      </button>
    );
  } else {
    favButton = (
      <button
        type="button"
        className="fav-btn btn btn-warning"
        onClick={() => dispatch(setFavourite())}
      >
        Mark as Favourite
      </button>
    );
  }

  return (
    <>
      <div
        data-testid="game-info"
        className="img-favourite-container"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <h5 className="transparent-banner py-2">{name}</h5>
        <h5 className="transparent-game-banner text-right py-2">{freePrice}</h5>
      </div>
      <pre className="favourite-content">{description}</pre>
      {favButton}
    </>
  );
};

GameInfo.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameInfo;
