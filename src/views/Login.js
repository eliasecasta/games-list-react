/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeUserName } from '../reducers/gameSlice';

function Login() {
  const dispatch = useDispatch();
  let userName = 'asd';

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changeUserName(userName));
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
      <input className="btn btn-primary" type="submit" value="Submit" />
    </form>
  );
}

export default Login;
