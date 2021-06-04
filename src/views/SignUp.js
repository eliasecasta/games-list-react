/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  changeUserName,
  postUserName,
  fetchFavourites,
} from '../reducers/gameSlice';

function SignUp() {
  const dispatch = useDispatch();
  let userName;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changeUserName(userName));
    dispatch(postUserName());
    dispatch(fetchFavourites());
  };

  const handleChange = (event) => {
    userName = event.target.value;
  };

  return (
    <form
      className="username-form text-center pt-5"
      onSubmit={(event) => handleSubmit(event)}
    >
      <h4>Username:</h4>
      <br />
      <input
        type="text"
        id="fname"
        name="fname"
        onChange={(event) => handleChange(event)}
        maxLength="10"
      />
      <br />
      <br />
      <input className="btn btn-primary" type="submit" value="Sign Up" />
    </form>
  );
}

export default SignUp;
