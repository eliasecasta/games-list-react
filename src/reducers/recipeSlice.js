/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len, no-param-reassign, consistent-return, no-console, implicit-arrow-linebreak */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  value: [],
  favourites: [],
  status: 'idle',
  error: null,
  meal: null,
  recipe: null,
  filter: 'All',
  userName: 'Guest',
};

export const fetchCategories = createAsyncThunk(
  'recipes/fetchCategories',
  async () => {
    try {
      const response = await axios.get(
        'https://games-list-api.herokuapp.com/games',
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const fetchMeals = createAsyncThunk('recipes/fetchMeals', async () => {
  try {
    const response = await axios.get(
      'https://games-list-api.herokuapp.com/favourites',
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (arg, { getState }) => {
    const state = getState();

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${state.recipe.recipe}`,
      );
      return response.data.meals;
    } catch (error) {
      console.log(error);
    }
  },
);

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    mealFilter: (state, action) => {
      state.meal = action.payload;
    },
    recipeFilter: (state, action) => {
      state.recipe = action.payload;
      state.value = state.value.filter((game) => game.name === state.recipe);
      state.status = 'recipe';
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    changeUserName: (state, action) => {
      state.userName = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => ({
        status: 'loading',
        value: state.value,
        meal: state.meal,
        filter: state.filter,
        userName: state.userName,
      }))
      .addCase(fetchCategories.fulfilled, (state, action) => ({
        status: 'categories',
        value: action.payload,
        filter: state.filter,
        userName: state.userName,
      }))
      .addCase(fetchCategories.rejected, (state, action) => ({
        status: 'failed',
        error: action.error.message,
        userName: state.userName,
      }))
      .addCase(fetchMeals.pending, (state) => ({
        status: 'loading',
        value: state.value,
        meal: state.meal,
        favourites: state.favourites,
        filter: 'All',
        userName: state.userName,
      }))
      .addCase(fetchMeals.fulfilled, (state, action) => ({
        status: 'meals',
        value: state.value,
        favourites: action.payload,
        meal: state.meal,
        filter: 'All',
        userName: state.userName,
      }))
      .addCase(fetchMeals.rejected, (state, action) => ({
        status: 'failed',
        error: action.error.message,
        userName: state.userName,
      }))
      .addCase(fetchRecipes.pending, (state) => ({
        status: 'loading',
        value: state.value,
        recipe: state.recipe,
        filter: 'All',
        userName: state.userName,
      }))
      .addCase(fetchRecipes.fulfilled, (state, action) => ({
        status: 'recipe',
        value: action.payload,
        recipe: state.recipe,
        filter: 'All',
        userName: state.userName,
      }))
      .addCase(fetchRecipes.rejected, (state, action) => ({
        status: 'failed',
        error: action.error.message,
        userName: state.userName,
      }));
  },
});

export const { mealFilter, recipeFilter, changeFilter, changeUserName } =
  foodSlice.actions;

export const selectAllRecipes = (state) => state.recipe.value;
export const selectAllFavourites = (state) => state.recipe.favourites;
export const selectRecipeById = (state, recipeId) =>
  state.recipe.value.find((recipe) => recipe.id === recipeId);

export default foodSlice.reducer;
