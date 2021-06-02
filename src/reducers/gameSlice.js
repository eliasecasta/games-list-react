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
  favourite: null,
  game: null,
  filter: 'All',
  userName: 'Guest',
  gameInfo: null,
};

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  try {
    const response = await axios.get(
      'https://games-list-api.herokuapp.com/games',
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchFavourites = createAsyncThunk(
  'games/fetchFavourites',
  async () => {
    try {
      const response = await axios.get(
        'https://games-list-api.herokuapp.com/favourites',
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

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
      .addCase(fetchFavourites.rejected, (state, action) => ({
        status: 'failed',
        error: action.error.message,
        userName: state.userName,
      }));
  },
});

export const { favouriteFilter, gameFilter, changeFilter, changeUserName } =
  gameSlice.actions;

export const selectAllGames = (state) => state.game.value;
export const selectAllFavourites = (state) => state.game.favourites;
export const selectGameInfo = (state) => state.game.gameInfo;

export default gameSlice.reducer;
