/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import userNotFound from '../handlers/userNotFound';
import { changeUserName, postUserName } from '../reducers/gameSlice';

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { status, error } = useSelector((state) => state.game);

  let userName;
  // let signUpError;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changeUserName(userName));
    dispatch(postUserName());
    history.push('/');
  };

  const handleChange = (event) => {
    userName = event.target.value;
  };

  // if (status === 'failed') {
  //   signUpError = error;
  // }

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
