import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../app/store';
import Game from '../Game';

afterEach(() => {
  cleanup();
});

describe('Game component tests', () => {
  const game = {
    id: 1,
    name: 'GTA V',
    image:
      'https://media-cdn.tripadvisor.com/media/photo-s/18/3a/09/6c/bonefish-seafood-platter.jpg',
    description: 'GTA V is an action roleplay game',
  };

  // This render is for normal testing
  render(
    <Provider store={store}>
      <Router>
        <Game game={game} />
      </Router>
    </Provider>,
  );

  // This renderer is for snapshot testing
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <Game game={game} />
        </Router>
      </Provider>,
    )
    .toJSON();

  const gameElement = screen.getByTestId('game');

  test('Component should Render', () => {
    expect(gameElement).toBeInTheDocument();
  });
  test('Component should contain GTA V name', () => {
    expect(gameElement).toHaveTextContent('GTA V');
  });
  test('Matches snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});
