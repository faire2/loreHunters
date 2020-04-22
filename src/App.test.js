import React from 'react';
import { render } from '@testing-library/react';
import GameBoard from './GameBoard';

test('renders learn react link', () => {
  const { getByText } = render(<GameBoard />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
