import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../app/store';
import Category from '../Category';

afterEach(() => {
  cleanup();
});

describe('Meal component tests', () => {
  const category = {
    idCategory: 1,
    strCategory: 'Seafood',
    strCategoryThumb:
      'https://media-cdn.tripadvisor.com/media/photo-s/18/3a/09/6c/bonefish-seafood-platter.jpg',
    strCategoryDescription: 'Seafood is delicious!',
  };

  // This render is for normal testing
  render(
    <Provider store={store}>
      <Router>
        <Category category={category} />
      </Router>
    </Provider>,
  );

  // This renderer is for snapshot testing
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <Category category={category} />
        </Router>
      </Provider>,
    )
    .toJSON();

  const categoryElement = screen.getByTestId('category');

  test('Component should Render', () => {
    expect(categoryElement).toBeInTheDocument();
  });
  test('Component should contain Seafood title', () => {
    expect(categoryElement).toHaveTextContent('Seafood');
  });
  test('Matches snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});
