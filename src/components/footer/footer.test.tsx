import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { withHistory } from '../../utils/mock-components';

describe('Component: Footer', () => {

  it('should render correctly', () => {
    const expectedElement = 'footerDivElement';
    const expectedText = /Интернет-магазин/;

    const preparedComponent = withHistory(<Footer />);
    render(preparedComponent);

    expect(screen.getByTestId(expectedElement)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
