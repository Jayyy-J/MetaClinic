import { render, screen } from '@testing-library/react';
import App from './App';
import HealthEvents from './components/HealthEvents';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: '1', description: 'Test Event', location: {x:0,y:0,z:0}, severity: 5 }]),
    ok: true,
  })
);

test('renders map and avatar components', () => {
  render(<App />);
  const mapElement = screen.getByText(/Mapa 3D/i);
  const avatarElement = screen.getByText(/Avatar del Usuario/i);
  expect(mapElement).toBeInTheDocument();
  expect(avatarElement).toBeInTheDocument();
});

test('fetches and renders health events', async () => {
  render(<HealthEvents />);
  const eventElement = await screen.findByText(/Event: Test Event/i);
  expect(eventElement).toBeInTheDocument();
});
