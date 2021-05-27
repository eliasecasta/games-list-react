/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Meal from '../components/Meal';
import {
  selectAllRecipes,
  selectAllFavourites,
  fetchMeals,
} from '../reducers/recipeSlice';

const MealList = () => {
  const dispatch = useDispatch();
  let meals = useSelector(selectAllRecipes);
  const favourites = useSelector(selectAllFavourites);

  const { status, error } = useSelector((state) => state.game);

  useEffect(() => {
    if (status === 'categories') {
      dispatch(fetchMeals());
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
  } else if (status === 'meals') {
    meals = meals.filter((game) =>
      favourites.some((favourite) => game.id === favourite.game_id),
    );
    content = meals.map((meal) => <Meal key={meal.id} meal={meal} />);
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <section className="categories-list">{content}</section>;
};

export default MealList;
