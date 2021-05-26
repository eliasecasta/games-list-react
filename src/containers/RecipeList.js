import React from 'react';
import { useSelector } from 'react-redux';
import Recipe from '../components/Recipe';
import { selectAllRecipes } from '../reducers/recipeSlice';

const RecipeList = () => {
  const recipes = useSelector(selectAllRecipes);
  const { status, error } = useSelector((state) => state.recipe);

  let content;

  if (status === 'loading') {
    content = (
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    );
  } else if (status === 'recipe') {
    content = recipes.map((recipe) => (
      <Recipe key={recipe.id} recipe={recipe} />
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <section className="categories-list">{content}</section>;
};

export default RecipeList;
