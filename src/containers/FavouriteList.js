/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Favourite from '../components/Favourite';
import { selectAllFavourites } from '../reducers/gameSlice';
import { fetchFavourites } from '../services/favouriteCalls';

const FavouriteList = () => {
  const dispatch = useDispatch();
  // const games = useSelector(selectAllGames);
  const favourites = useSelector(selectAllFavourites);

  const { status, error } = useSelector((state) => state.game);

  useEffect(() => {
    if (status === 'games' || status === 'game-info') {
      dispatch(fetchFavourites());
    }
  }, [status, dispatch]);

  let content;
  let userGames;

  if (status === 'loading') {
    content = (
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    );
  } else if (status === 'favourites' || status === 'failed') {
    // games = games.filter((game) =>
    //   favourites.some((favourite) => game.id === favourite.game_id),
    // );
    if (
      favourites === null ||
      favourites === undefined ||
      favourites === [] ||
      favourites.length === 0
    ) {
      content = (
        <h3>
          Please go to the home page and favourite some games to see them here!
        </h3>
      );
    } else {
      userGames = favourites.map((game) => game);
      content = userGames.map((game) => (
        <Favourite key={game.id} game={game} />
      ));
    }
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <section className="games-list">{content}</section>;
};

export default FavouriteList;
