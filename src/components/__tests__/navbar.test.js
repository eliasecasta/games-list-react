import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import NavBar from '../NavBar';
import store from '../../app/store';

afterEach(() => {
  cleanup();
});

describe('NavBar component tests', () => {
  // This render is for normal testing
  render(
    <Provider store={store}>
      <Router>
        <NavBar />
      </Router>
    </Provider>,
  );

  // This renderer is for snapshot testing
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>,
    )
    .toJSON();

  const navbarElement = screen.getByTestId('navbar');

  test('Component should Render', () => {
    expect(navbarElement).toBeInTheDocument();
  });
  test('Component should contain flavourbomb string', () => {
    expect(navbarElement).toHaveTextContent(
      'Open MenuHomeDev FavouritesLog InClose MenuGames ListGuest',
    );
  });

  test('Matches snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});
