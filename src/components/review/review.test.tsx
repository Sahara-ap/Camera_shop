import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import { Review } from './review';

describe('Component: Review', () => {

  it('should render correctly', () => {
    const mockReview = makeFakeReview();
    const expectedText = /Достоинства/;

    render(<Review review={mockReview}/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
