import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import NavBar from '../NavBar';

afterEach(() => {
  cleanup();
});

describe('NavBar component tests', () => {
  // This render is for normal testing
  render(
    <Router>
      <NavBar />
    </Router>,
  );

  // This renderer is for snapshot testing
  const tree = renderer
    .create(
      <Router>
        <NavBar />
      </Router>,
    )
    .toJSON();

  const navbarElement = screen.getByTestId('navbar');

  test('Component should Render', () => {
    expect(navbarElement).toBeInTheDocument();
  });
  test('Component should contain flavourbomb string', () => {
    expect(navbarElement).toHaveTextContent('flavourbomb');
  });

  test('Matches snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});
