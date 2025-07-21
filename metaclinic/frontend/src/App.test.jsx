import { render, screen } from '@testing-library/react';
import App from './App';

test('renders map and avatar components', () => {
  render(<App />);
  const mapElement = screen.getByText(/Mapa 3D/i);
  const avatarElement = screen.getByText(/Avatar del Usuario/i);
  expect(mapElement).toBeInTheDocument();
  expect(avatarElement).toBeInTheDocument();
});
