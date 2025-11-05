import { render, screen } from '@testing-library/react';

import CarriageList from '../TrainDisplay/CarriageList';

describe('CarriageList', () => {
  const segments = [
    {
      carriages: [
        { number: 1, features: ['bike'] },
        { number: 2, features: [] },
      ],
    },
  ];

  it('describes the direction of travel', () => {
    render(<CarriageList segments={segments} direction="left" />);
    expect(screen.getByText(/departure direction: left/i)).toBeInTheDocument();
  });

  it('renders carriages with feature badges', () => {
    render(<CarriageList segments={segments} direction="right" />);
    expect(screen.getAllByTestId('carriage')).toHaveLength(2);
  });

  it('matches the snapshot', () => {
    const { container } = render(<CarriageList segments={segments} direction="right" />);
    expect(container).toMatchSnapshot();
  });
});
