/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  try {
    const response = await axios.get('https://games-list-api.herokuapp.com/games');
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
