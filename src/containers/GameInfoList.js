import React from 'react';
import { useSelector } from 'react-redux';
import GameInfo from '../components/GameInfo';
import { selectAllGames } from '../reducers/gameSlice';

const GameInfoList = () => {
  const recipes = useSelector(selectAllGames);
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
    content = recipes.map((recipe) => (
      <GameInfo key={recipe.id} recipe={recipe} />
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <section className="categories-list">{content}</section>;
};

export default GameInfoList;
