import { useSelector } from 'react-redux';

function userNotFound() {
  const { status, error } = useSelector((state) => state.game);
  let signUpError = '';
  if (status === 'failed') {
    signUpError = error;
  }
  return <div className="errorMessage mb-2 text-danger">{signUpError}</div>;
}

export default userNotFound;
