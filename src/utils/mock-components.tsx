import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import thunk from 'redux-thunk';

import { State } from '../types/store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { ThunkDispatch } from 'redux-thunk';

function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory} >
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
    mockAxiosAdapter: MockAdapter;
}
function withStore(component: JSX.Element, initialState: Partial<State> = {}): ComponentWithMockStore {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);

  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  const mockStore = mockStoreCreator(initialState);


  return ({
    withStoreComponent:
      <Provider store={mockStore}>
        {component}
      </Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}

export {
  withHistory,
  withStore,

};
