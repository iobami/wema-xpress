import { render, screen } from '@testing-library/react';
import Page from '.';

test('renders welcome back text', () => {
  render(<Page />);
  const linkElement = screen.getByText(/Welcome Back/i);
  expect(linkElement).toBeInTheDocument();
});
