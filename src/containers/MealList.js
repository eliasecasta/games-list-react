/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Favourite from '../components/Meal';
import {
  selectAllGames,
  selectAllFavourites,
  fetchFavourites,
} from '../reducers/gameSlice';

const FavouriteList = () => {
  const dispatch = useDispatch();
  let meals = useSelector(selectAllGames);
  const favourites = useSelector(selectAllFavourites);

  const { status, error } = useSelector((state) => state.game);

  useEffect(() => {
    if (status === 'games') {
      dispatch(fetchFavourites());
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
  } else if (status === 'favourites') {
    meals = meals.filter((game) =>
      favourites.some((favourite) => game.id === favourite.game_id),
    );
    content = meals.map((meal) => <Favourite key={meal.id} meal={meal} />);
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <section className="categories-list">{content}</section>;
};

export default FavouriteList;
