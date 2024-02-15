import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-components';
import { ModalAddItem } from './modal-add-item';
import { makeFakeModalAndProductSlice } from '../../utils/mocks';

describe('Component: ModalAddItem', () => {

  it('should render correctly', () => {
    const expectedElementId = 'modalAddItemDiv';
    const mockState = makeFakeModalAndProductSlice();

    const { withStoreComponent } = withStore(<ModalAddItem />, mockState);

    render(withStoreComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
