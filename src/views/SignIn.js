/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import userNotFound from '../handlers/userNotFound';
import { changeUserName, fetchFavourites } from '../reducers/gameSlice';

function SignIn() {
  const dispatch = useDispatch();
  let userNameLocal;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changeUserName(userNameLocal));
    dispatch(fetchFavourites());
  };

  const handleChange = (event) => {
    userNameLocal = event.target.value;
  };

  return (
    <form
      className="username-form text-center pt-5"
      onSubmit={(event) => handleSubmit(event)}
    >
      <h4>Username:</h4>
      <br />
      {userNotFound()}

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

export default SignIn;
