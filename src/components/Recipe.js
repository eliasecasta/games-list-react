/* eslint-disable max-len, operator-linebreak, object-curly-newline, react/forbid-prop-types, jsx-a11y/anchor-is-valid */
import { PropTypes } from 'prop-types';

const Recipe = ({
  recipe: { strMeal, strMealThumb, strInstructions, strYoutube },
}) => {
  const youtubeVid = strYoutube.replace('watch?v=', 'embed/');
  let vidContainer;

  if (youtubeVid !== '') {
    vidContainer = (
      <div className="youtube-vid-container">
        <iframe title="recipe video" className="youtube-vid" src={youtubeVid} />
      </div>
    );
  } else {
    vidContainer = '';
  }

  return (
    <>
      <div
        data-testid="recipe"
        className="img-meal-container"
        style={{
          backgroundImage: `url(${strMealThumb})`,
        }}
      >
        <h5 className="transparent-banner pl-3 py-2">{strMeal}</h5>
      </div>
      <pre className="meal-content">{strInstructions}</pre>
      {vidContainer}
    </>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default Recipe;
