/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
      if (response.status === 404) {
        return ErrorEvent;
      }
      return response.data;
    } catch (error) {
      state.game.userName = 'guest';
      console.log(error);
    }
  },
);
