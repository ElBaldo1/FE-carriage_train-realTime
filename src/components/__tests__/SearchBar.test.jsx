import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBar from '../SearchBar/SearchBar';

describe('SearchBar', () => {
  it('calls onChange when typing', async () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();
    render(<SearchBar value="" onChange={handleChange} onSubmit={handleSubmit} />);

    const input = screen.getByRole('searchbox', { name: /search for a train station/i });
    await userEvent.type(input, 'Brussels');

    expect(handleChange).toHaveBeenCalled();
  });

  it('submits the form when pressing enter', async () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();
    render(<SearchBar value="Brussels" onChange={handleChange} onSubmit={handleSubmit} />);

    const input = screen.getByRole('searchbox', { name: /search for a train station/i });
    await userEvent.type(input, '{enter}');

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('matches the snapshot', () => {
    const { container } = render(
      <SearchBar value="Brussels" onChange={jest.fn()} onSubmit={jest.fn()} disabled={false} />
    );

    expect(container).toMatchSnapshot();
  });
});
