/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import userNotFound from '../handlers/userNotFound';
import { changeUserName } from '../reducers/gameSlice';
import { postUserName } from '../services/userCalls';

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  let userName;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changeUserName(userName));
    dispatch(postUserName());
    history.push('/');
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

export default SignUp;
