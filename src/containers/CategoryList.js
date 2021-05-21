import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Category from '../components/Category';
import CategoryFilter from '../components/CategoryFilter';
import {
  selectAllRecipes,
  fetchCategories,
  changeFilter,
} from '../reducers/recipeSlice';

const CategoryList = () => {
  const dispatch = useDispatch();
  const recipeCategories = useSelector(selectAllRecipes);
  const { status, error, filter } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (status === 'idle' || status === 'meals' || status === 'recipe') {
      dispatch(fetchCategories());
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
  } else if (status === 'categories') {
    filteredCategories = recipeCategories.map((recipe) => recipe.strCategory);
    filtered = (
      <CategoryFilter
        filteredCategories={filteredCategories}
        handleFilterChange={handleFilterChange}
      />
    );

    if (filter === 'All') {
      content = recipeCategories.map((category) => (
        <Category key={category.idCategory} category={category} />
      ));
    } else {
      filteredContent = recipeCategories.filter(
        (category) => category.strCategory === filter,
      );
      content = filteredContent.map((category) => (
        <Category key={category.idCategory} category={category} />
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
