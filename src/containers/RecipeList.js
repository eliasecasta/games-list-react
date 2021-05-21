import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Recipe from '../components/Recipe';
import { selectAllRecipes, fetchRecipes } from '../reducers/recipeSlice';

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const { status, error } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (status === 'meals') {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

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
    content = recipes.map((recipe) => <Recipe key={recipe.idMeal} recipe={recipe} />);
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <section className="categories-list">{content}</section>;
};

export default RecipeList;
