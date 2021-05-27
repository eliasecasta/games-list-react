/* eslint-disable operator-linebreak */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Game from '../components/Game';
import GameFilter from '../components/GameFilter';
import {
  selectAllGames,
  fetchGames,
  changeFilter,
} from '../reducers/gameSlice';

const GameList = () => {
  const dispatch = useDispatch();
  const gameInfoGames = useSelector(selectAllGames);
  const { status, error, filter } = useSelector((state) => state.game);

  useEffect(() => {
    if (
      status === 'idle' ||
      status === 'favourites' ||
      status === 'game-info'
    ) {
      dispatch(fetchGames());
    }
  }, [status, dispatch]);

  const handleFilterChange = (event) => {
    event.preventDefault();
    dispatch(changeFilter(event.target.value));
  };

  let content;
  let filteredGames = ['All'];
  let filtered;
  let filteredContent;

  if (status === 'loading') {
    content = (
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    );
  } else if (status === 'games') {
    filteredGames = gameInfoGames.map((game) => game.name);
    filtered = (
      <GameFilter
        filteredGames={filteredGames}
        handleFilterChange={handleFilterChange}
      />
    );

    if (filter === 'All') {
      content = gameInfoGames.map((game) => <Game key={game.id} game={game} />);
    } else {
      filteredContent = gameInfoGames.filter(
        (gameInfoGame) => gameInfoGame.name === filter,
      );
      content = filteredContent.map((game) => (
        <Game key={game.id} game={game} />
      ));
    }
  } else {
    content = <div>{error}</div>;
  }

  return (
    <>
      <div>{filtered}</div>
      <section className="games-list">{content}</section>
    </>
  );
};

export default GameList;
