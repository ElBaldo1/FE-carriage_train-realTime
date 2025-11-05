import { render, screen } from '@testing-library/react';

import TrainDisplay from '../TrainDisplay/TrainDisplay';

const mockTrain = {
  id: 'train-001',
  stationName: 'Brussels Central',
  destination: 'Antwerpen-Centraal',
  trainName: 'S5',
  time: '12:05',
  platform: '4',
  status: 'On time',
  nextStops: ['Schuman', 'Merode'],
  segments: [
    {
      carriages: [
        { number: 1, features: ['bike'] },
        { number: 2, features: ['wheelchair'] },
      ],
    },
  ],
  direction: 'right',
  occupancy: 'Moderate',
  lastUpdated: '2023-01-01T18:45:00.000Z',
};

describe('TrainDisplay', () => {
  it('renders loading state', () => {
    render(<TrainDisplay loading trains={[]} />);
    expect(screen.getByRole('status')).toHaveTextContent(/loading live train data/i);
  });

  it('renders error state', () => {
    render(<TrainDisplay error="Network error" trains={[]} />);
    expect(screen.getByRole('alert')).toHaveTextContent(/network error/i);
  });

  it('renders train data when available', () => {
    render(<TrainDisplay trains={[mockTrain]} />);
    expect(screen.getByRole('heading', { name: /s5 to antwerpen-centraal/i })).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<TrainDisplay trains={[mockTrain]} />);
    expect(container).toMatchSnapshot();
  });
});
