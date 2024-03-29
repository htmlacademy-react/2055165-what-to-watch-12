import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component LoadingScreen', () => {
  it('should render correctly', () => {
    render(<LoadingScreen />);

    expect(screen.getByTestId('loading-spinner-screen')).toBeInTheDocument();
  });
});
