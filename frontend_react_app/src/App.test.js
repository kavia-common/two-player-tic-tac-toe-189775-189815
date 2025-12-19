import { render, screen } from '@testing-library/react';
import App from './App';

test('renders initial turn status', () => {
  render(<App />);
  const status = screen.getByTestId('status-text');
  expect(status).toBeInTheDocument();
  expect(status).toHaveTextContent(/Turn: Player X/i);
});
