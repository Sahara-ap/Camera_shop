import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-components';
import { ErrorConnection } from './error-connection';
import { fetchCamerasAction } from '../../store/api-actions/card-actions';
import userEvent from '@testing-library/user-event';
import { extractActionTypes } from '../../utils/mocks';
import { APIRoute } from '../../consts';

describe('Component: ErrorConnection', () => {
  const mockPage = 'catalog';
  const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ErrorConnection page={mockPage}/>);

  it('should render correctly', () => {
    const expectedText = 'Попробовать ещё раз';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should dispatch "fetchCamerasAction.pending" and "fetchCamerasAction.fulfilled" ThunkActions when push button and mockPage="catalog"',
    async () => {

      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200);
      render(withStoreComponent);

      await userEvent.click(screen.getByRole('button'));
      const actionTypes = extractActionTypes(mockStore.getActions());

      expect(actionTypes).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.fulfilled.type,
      ]);

    });

});
