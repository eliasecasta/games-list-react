/* eslint-disable max-len, operator-linebreak, object-curly-newline, react/forbid-prop-types, jsx-a11y/anchor-is-valid */
import { PropTypes } from 'prop-types';

const GameInfo = ({ game: { name, image, price, description } }) => {
  let freePrice;

  if (price === 0) {
    freePrice = 'Free!';
  } else {
    freePrice = `$ ${price}`;
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
    </>
  );
};

GameInfo.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameInfo;
