/* eslint-disable operator-linebreak */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Category from '../components/Category';
import CategoryFilter from '../components/CategoryFilter';
import {
  selectAllGames,
  fetchGames,
  changeFilter,
} from '../reducers/recipeSlice';

const CategoryList = () => {
  const dispatch = useDispatch();
  const recipeCategories = useSelector(selectAllGames);
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
  let filteredCategories = ['All'];
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
    filteredCategories = recipeCategories.map((game) => game.name);
    filtered = (
      <CategoryFilter
        filteredCategories={filteredCategories}
        handleFilterChange={handleFilterChange}
      />
    );

    if (filter === 'All') {
      content = recipeCategories.map((category) => (
        <Category key={category.id} category={category} />
      ));
    } else {
      filteredContent = recipeCategories.filter(
        (category) => category.name === filter,
      );
      content = filteredContent.map((category) => (
        <Category key={category.id} category={category} />
      ));
    }
  } else {
    content = <div>{error}</div>;
  }

  return (
    <>
      <div>{filtered}</div>
      <section className="categories-list">{content}</section>
    </>
  );
};

export default CategoryList;
