/* eslint-disable object-shorthand */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
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
    const response = await axios.get('http://127.0.0.1:3000/games');
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchFavourites = createAsyncThunk(
  'games/fetchFavourites',
  async (arg, { getState }) => {
    const state = getState();

    try {
      const response = await axios.get('http://127.0.0.1:3000/favourites', {
        params: {
          name: state.game.userName.toLowerCase(),
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const setFavourite = createAsyncThunk(
  'games/setFavourite',
  async (arg, { getState }) => {
    const state = getState();
    console.log(state.game.gameInfo[0].id);

    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/games/${state.game.gameInfo[0].id}/favourite`,
        {
          type: 'favourite',
          name: state.game.userName.toLowerCase(),
        },
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteFavourite = createAsyncThunk(
  'games/deleteFavourite',
  async (arg, { getState }) => {
    const state = getState();
    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/games/${state.game.gameInfo[0].id}/favourite`,
        {
          type: 'unfavourite',
          name: state.game.userName.toLowerCase(),
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const postUserName = createAsyncThunk(
  'games/postUserName',
  async (arg, { getState }) => {
    const state = getState();

    try {
      const formData = new FormData();
      formData.append('name', `${state.game.userName.toLowerCase()}`);

      const response = await axios.post(
        'http://127.0.0.1:3000/users',
        formData,
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
      }))
      .addCase(postUserName.pending, (state) => ({
        status: 'loading',
        value: state.value,
        favourite: state.favourite,
        favourites: state.favourites,
        filter: 'All',
        userName: state.userName,
        gameInfo: state.gameInfo,
      }))
      .addCase(postUserName.fulfilled, (state, action) => ({
        status: 'favourites',
        value: state.value,
        favourites: state.favourites,
        favourite: state.favourite,
        filter: 'All',
        userName: action.payload.name,
        gameInfo: state.gameInfo,
      }))
      .addCase(postUserName.rejected, (state, action) => ({
        status: 'failed',
        error: action.error.message,
        userName: state.userName,
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
      }));
  },
});

export const { favouriteFilter, gameFilter, changeFilter, changeUserName } =
  gameSlice.actions;

export const selectAllGames = (state) => state.game.value;
export const selectAllFavourites = (state) => state.game.favourites;
export const selectGameInfo = (state) => state.game.gameInfo;

export default gameSlice.reducer;
