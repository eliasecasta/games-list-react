/* eslint-disable object-shorthand */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len, no-param-reassign, consistent-return, no-console, implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';
import { fetchGames } from '../services/gameCalls';
import {
  fetchFavourites,
  setFavourite,
  deleteFavourite,
} from '../services/favouriteCalls';
import { postUserName } from '../services/userCalls';

const initialState = {
  value: [],
  favourites: [],
  status: 'idle',
  error: null,
  favourite: null,
  game: null,
  filter: 'All',
  userName: 'Guest',
  gameInfo: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    favouriteFilter: (state, action) => {
      state.favourite = action.payload;
    },
    gameFilter: (state, action) => {
      state.game = action.payload;
      state.gameInfo = state.value.filter((game) => game.name === state.game);
      state.status = 'game-info';
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    changeUserName: (state, action) => {
      state.userName = action.payload;
    },
    signOut: (state) => {
      state.userName = 'Guest';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => ({
        status: 'loading',
        value: state.value,
        favourite: state.favourite,
        favourites: state.favourites,
        filter: state.filter,
        userName: state.userName,
        gameInfo: state.gameInfo,
      }))
      .addCase(fetchGames.fulfilled, (state, action) => ({
        status: 'games',
        value: action.payload,
        favourite: state.favourite,
        favourites: state.favourites,
        filter: state.filter,
        userName: state.userName,
        gameInfo: state.gameInfo,
      }))
      .addCase(fetchGames.rejected, (state, action) => ({
        status: 'failed',
        error: action.error.message,
        userName: state.userName,
      }))
      .addCase(fetchFavourites.pending, (state) => ({
        status: 'loading',
        value: state.value,
        favourite: state.favourite,
        favourites: state.favourites,
        filter: 'All',
        userName: state.userName,
        gameInfo: state.gameInfo,
      }))
      .addCase(fetchFavourites.fulfilled, (state, action) => ({
        status: 'favourites',
        value: state.value,
        favourites: action.payload,
        favourite: state.favourite,
        filter: 'All',
        userName: state.userName,
        gameInfo: state.gameInfo,
      }))
      .addCase(fetchFavourites.rejected, (state) => ({
        status: 'failed',
        error: 'Username does not exist.',
        userName: 'Guest',
        value: state.value,
        filter: state.filter,
      }))
      .addCase(postUserName.pending, (state) => ({
        status: 'loading',
        value: state.value,
        favourite: state.favourite,
        filter: 'All',
        userName: state.userName,
        gameInfo: state.gameInfo,
      }))
      .addCase(postUserName.fulfilled, (state, action) => ({
        status: 'favourites',
        value: state.value,
        favourites: state.favourites,
        filter: 'All',
        userName: action.payload.name,
        gameInfo: state.gameInfo,
      }))
      .addCase(postUserName.rejected, (state) => ({
        status: 'failed',
        error: 'Username already taken, use a different one',
        userName: 'Guest',
        value: state.value,
        filter: state.filter,
      }))
      .addCase(setFavourite.pending, (state) => ({
        status: 'loading',
        value: state.value,
        favourite: state.favourite,
        favourites: state.favourites,
        filter: 'All',
        userName: state.userName,
        gameInfo: state.gameInfo,
      }))
      .addCase(setFavourite.fulfilled, (state, action) => ({
        status: 'game-info',
        value: state.value,
        favourites: action.payload,
        favourite: state.favourite,
        filter: 'All',
        userName: state.userName,
        gameInfo: state.gameInfo,
      }))
      .addCase(setFavourite.rejected, (state, action) => ({
        status: 'failed',
        error: action.error.message,
        userName: state.userName,
      }))
      .addCase(deleteFavourite.pending, (state) => ({
        status: 'loading',
        value: state.value,
        favourite: state.favourite,
        favourites: state.favourites,
        filter: 'All',
        userName: state.userName,
        gameInfo: state.gameInfo,
      }))
      .addCase(deleteFavourite.fulfilled, (state, action) => ({
        status: 'game-info',
        value: state.value,
        favourites: action.payload,
        favourite: state.favourite,
        filter: 'All',
        userName: state.userName,
        gameInfo: state.gameInfo,
      }))
      .addCase(deleteFavourite.rejected, (state, action) => ({
        status: 'failed',
        error: action.error.message,
        userName: state.userName,
      }));
  },
});

export const {
  favouriteFilter,
  gameFilter,
  changeFilter,
  changeUserName,
  signOut,
} = gameSlice.actions;

export const selectAllGames = (state) => state.game.value;
export const selectAllFavourites = (state) => state.game.favourites;
export const selectGameInfo = (state) => state.game.gameInfo;

export default gameSlice.reducer;
