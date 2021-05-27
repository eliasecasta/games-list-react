import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../../app/store';
import Favourite from '../Favourite';

afterEach(() => {
  cleanup();
});

describe('Favourite component tests', () => {
  const game = {
    id: 1,
    name: 'Path of Exile',
    image:
      'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/04/pizzapepperoni0.jpg',
  };

  // This render is for normal testing
  render(
    <Provider store={store}>
      <Router>
        <Favourite game={game} />
      </Router>
    </Provider>,
  );

  // This renderer is for snapshot testing
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <Favourite game={game} />
        </Router>
      </Provider>,
    )
    .toJSON();

  const favouriteElement = screen.getByTestId('favourite');

  test('Component should Render', () => {
    expect(favouriteElement).toBeInTheDocument();
  });
  test('Component should contain Path of Exile name', () => {
    expect(favouriteElement).toHaveTextContent('Path of Exile');
  });
  test('Matches snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});
