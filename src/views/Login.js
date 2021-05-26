/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeUserName } from '../reducers/recipeSlice';

function Login() {
  const dispatch = useDispatch();
  let userName = 'asd';

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userName);
    console.log(event.target.value);
    dispatch(changeUserName(userName));
  };

  const handleChange = (event) => {
    userName = event.target.value;
    console.log(userName, event);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label>Username:</label>
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
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
