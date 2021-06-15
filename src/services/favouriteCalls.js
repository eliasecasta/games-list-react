/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setFavourite = createAsyncThunk(
  'games/setFavourite',
  async (arg, { getState }) => {
    const state = getState();

    try {
      const formData = new FormData();
      formData.append('name', `${state.game.userName.toLowerCase()}`);
      formData.append('game_id', `${state.game.gameInfo[0].id}`);

      const response = await axios.post(
        'https://games-list-api.herokuapp.com/favourites',
        formData,
      );
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
      const response = await axios.delete(
        `https://games-list-api.herokuapp.com/favourites/${state.game.gameInfo[0].id}`,
        {
          params: {
            name: state.game.userName.toLowerCase(),
            game_id: state.game.gameInfo[0].id,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
