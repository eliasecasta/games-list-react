import React from 'react';
import { useSelector } from 'react-redux';
import GameInfo from '../components/GameInfo';
import { selectAllGames } from '../reducers/gameSlice';

const GameInfoList = () => {
  const games = useSelector(selectAllGames);
  const { status, error } = useSelector((state) => state.game);

  let content;

  if (status === 'loading') {
    content = (
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    );
  } else if (status === 'game-info') {
    content = games.map((game) => <GameInfo key={game.id} game={game} />);
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <section className="games-list">{content}</section>;
};

export default GameInfoList;
