import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { ThunkDispatch } from 'redux-thunk';

import { createApi } from '../../services/api';
import { State } from '../../types/store';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../../consts';
import { fetchBannerAction } from './banner-action';
import { extractActionTypes, makeFakeBanners, makeFakeCards, makeFakeReviewPost, makeFakeReviews, makeFakeSelectedCard, makeFakeSimilars } from '../../utils/mocks';
import { fetchCamerasAction, fetchSelectedCameraAction, fetchSimilars } from './card-actions';
import { fetchReviews, postReview } from './reviews-action';
import { postCoupon, postOrders } from './basket-actions';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>

describe('Async actions', () => {
  const api = createApi();
  const mockAxiosAdapter = new MockAdapter(api);

  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let mockStore: ReturnType<typeof mockStoreCreator>;


  beforeEach(() => {
    mockStore = mockStoreCreator({
      APP: {},
      BANNER: {},
      CARDS: {},
      MODALS: {},
      REVIEWS: {},
      SELECTED_CARD: {},
      SIMILAR: {},
    });
  });

  describe('fetchBanners', () => {
    it('should dispatch fetchBannerAction.pending and fetchBannerAction.fulfilled with "fetchBannerAction" when server response 200',
      async () => {
        const mockBanners = makeFakeBanners();
        mockAxiosAdapter.onGet(APIRoute.Banner).reply(200, mockBanners);

        await mockStore.dispatch(fetchBannerAction());
        const emittedActions = mockStore.getActions();
        const extractedActionTypes = extractActionTypes(emittedActions);
        const fetchBannersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchBannerAction.fulfilled>;


        expect(extractedActionTypes).toEqual([
          fetchBannerAction.pending.type,
          fetchBannerAction.fulfilled.type,
        ]);
        expect(fetchBannersActionFulfilled.payload).toEqual(mockBanners);
      });

    it('should dispatch fetchBannerAction.pending and fetchBannerAction.rejected with "fetchBannerAction" when server response 400',
      async () => {
        mockAxiosAdapter.onGet(APIRoute.Banner).reply(400, []);
        await mockStore.dispatch(fetchBannerAction());
        const actionTypes = extractActionTypes(mockStore.getActions());

        expect(actionTypes).toEqual([
          fetchBannerAction.pending.type,
          fetchBannerAction.rejected.type
        ]);
      });
  });

  describe('fetchCamerasAction', () => {
    it('should dispatch fetchCamerasAction.pending and fetchCamerasAction.fulfilled with "fetchCamerasAction" when server response 200',
      async () => {
        const mockCards = makeFakeCards();
        mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockCards);

        await mockStore.dispatch(fetchCamerasAction());
        const emittedActions = mockStore.getActions();
        const extractedActionTypes = extractActionTypes(emittedActions);
        const fetchCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCamerasAction.fulfilled>;


        expect(extractedActionTypes).toEqual([
          fetchCamerasAction.pending.type,
          fetchCamerasAction.fulfilled.type,
        ]);
        expect(fetchCamerasActionFulfilled.payload).toEqual(mockCards);
      });

    it('should dispatch fetchCamerasAction.pending and fetchCamerasAction.rejected with "fetchCamerasAction" when server response 400',
      async () => {
        mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400, []);
        await mockStore.dispatch(fetchCamerasAction());
        const actionTypes = extractActionTypes(mockStore.getActions());

        expect(actionTypes).toEqual([
          fetchCamerasAction.pending.type,
          fetchCamerasAction.rejected.type
        ]);
      });
  });

  describe('fetchSelectedCameraAction', () => {
    it('should dispatch fetchSelectedCameraAction.pending and fetchSelectedCameraAction.fulfilled with "fetchSelectedCameraAction" when server response 200',
      async () => {
        const mockSelectedCard = makeFakeSelectedCard();
        const mockCardId = String(mockSelectedCard.id);
        mockAxiosAdapter.onGet(`${APIRoute.SelectedCamera}/${mockCardId}`).reply(200, mockSelectedCard);

        await mockStore.dispatch(fetchSelectedCameraAction(mockCardId));
        const emittedActions = mockStore.getActions();
        const extractedActionTypes = extractActionTypes(emittedActions);
        const fetchSelectedCameraActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSelectedCameraAction.fulfilled>;


        expect(extractedActionTypes).toEqual([
          fetchSelectedCameraAction.pending.type,
          fetchSelectedCameraAction.fulfilled.type,
        ]);
        expect(fetchSelectedCameraActionFulfilled.payload).toEqual(mockSelectedCard);
      });

    it('should dispatch fetchSelectedCameraAction.pending and fetchSelectedCameraAction.rejected with "fetchSelectedCameraAction" when server response 400',
      async () => {
        const mockCardId = '1';
        mockAxiosAdapter.onGet(`${APIRoute.SelectedCamera}/${mockCardId}`).reply(400, {});
        await mockStore.dispatch(fetchSelectedCameraAction(mockCardId));
        const actionTypes = extractActionTypes(mockStore.getActions());

        expect(actionTypes).toEqual([
          fetchSelectedCameraAction.pending.type,
          fetchSelectedCameraAction.rejected.type
        ]);
      });
  });

  describe('fetchSimilars', () => {
    it('should dispatch fetchSimilars.pending and fetchSimilars.fulfilled with fetchSimilarsAction  when server response 200',
      async () => {
        const mockSimilars = makeFakeSimilars();
        const cameraId = '1';
        const path = `${APIRoute.Cameras}/${cameraId}${APIRoute.Similars}`;
        mockAxiosAdapter.onGet(path).reply(200, mockSimilars);

        await mockStore.dispatch(fetchSimilars(cameraId));
        const actions = mockStore.getActions();
        const actionTypes = extractActionTypes(actions);
        const fetchSimilarsFulfilledAction = actions.at(1) as ReturnType<typeof fetchSimilars.fulfilled>;
        const fetchSimilarsFulfilledPayload = fetchSimilarsFulfilledAction.payload;

        expect(actionTypes).toEqual([
          fetchSimilars.pending.type,
          fetchSimilars.fulfilled.type
        ]);
        expect(fetchSimilarsFulfilledPayload).toEqual(mockSimilars);
      });

    it('should dispatch fetchSimilars.pending and fetchSimilars.rejected with fetchSimilarsAction when server response 400',
      async () => {
        const cameraId = '1';
        const path = `${APIRoute.Cameras}/${cameraId}${APIRoute.Similars}`;
        mockAxiosAdapter.onGet(path).reply(400, []);

        await mockStore.dispatch(fetchSelectedCameraAction(cameraId));
        const actionTypes = extractActionTypes(mockStore.getActions());

        expect(actionTypes).toEqual([
          fetchSelectedCameraAction.pending.type,
          fetchSelectedCameraAction.rejected.type
        ]);
      });
  });

  describe('fetchReviews', () => {
    it('should dispatch fetchReviews.pending and fetchReviews.fulfilled with fetchReviewsAction  when server response 200',
      async () => {
        const mockReviews = makeFakeReviews();
        const cameraId = '1';
        const path = `${APIRoute.Cameras}/${cameraId}${APIRoute.Reviews}`;
        mockAxiosAdapter.onGet(path).reply(200, mockReviews);

        await mockStore.dispatch(fetchReviews(cameraId));
        const actions = mockStore.getActions();
        const actionTypes = extractActionTypes(actions);
        const fetchReviewsFulfilledAction = actions.at(1) as ReturnType<typeof fetchReviews.fulfilled>;
        const fetchReviewsFulfilledPayload = fetchReviewsFulfilledAction.payload;

        expect(actionTypes).toEqual([
          fetchReviews.pending.type,
          fetchReviews.fulfilled.type
        ]);
        expect(fetchReviewsFulfilledPayload).toEqual(mockReviews);
      });

    it('should dispatch fetchReviews.pending and fetchReviews.rejected with fetchReviewsAction when server response 400',
      async () => {
        const cameraId = '1';
        const path = `${APIRoute.Cameras}/${cameraId}${APIRoute.Reviews}`;
        mockAxiosAdapter.onGet(path).reply(400, []);

        await mockStore.dispatch(fetchReviews(cameraId));
        const actionTypes = extractActionTypes(mockStore.getActions());

        expect(actionTypes).toEqual([
          fetchReviews.pending.type,
          fetchReviews.rejected.type
        ]);
      });
  });

  describe('postReview', () => {
    it('should dispatch postReview.pending and postReview.fulfilled with postReviewAction  when server response 200',
      async () => {
        const mockReviews = makeFakeReviews();
        const mockBody = makeFakeReviewPost();
        const path = APIRoute.Reviews;
        mockAxiosAdapter.onPost(path).reply(200, mockReviews);

        await mockStore.dispatch(postReview(mockBody));
        const actions = mockStore.getActions();
        const actionTypes = extractActionTypes(actions);
        const postReviewFulfilledAction = actions.at(1) as ReturnType<typeof postReview.fulfilled>;
        const postReviewFulfilledPayload = postReviewFulfilledAction.payload;

        expect(actionTypes).toEqual([
          postReview.pending.type,
          postReview.fulfilled.type
        ]);
        expect(postReviewFulfilledPayload).toEqual(mockReviews);
      });

    it('should dispatch postReview.pending and postReview.rejected with postReviewAction when server response 400',
      async () => {
        const mockBody = makeFakeReviewPost();
        const path = APIRoute.Reviews;
        mockAxiosAdapter.onPost(path).reply(400, []);

        await mockStore.dispatch(postReview(mockBody));
        const actionTypes = extractActionTypes(mockStore.getActions());

        expect(actionTypes).toEqual([
          postReview.pending.type,
          postReview.rejected.type
        ]);
      });
  });

  describe('postCoupon', () => {
    it('with "postCoupon" thunkAction and server response 200 - should dispatch postCoupon.pending and postCoupon.fulfilled actions',
      async () => {
        const mockServerResponse = 15;
        const mockBody = { coupon: 'any string' };
        const path = APIRoute.Coupons;
        mockAxiosAdapter.onPost(path).reply(200, mockServerResponse);

        await mockStore.dispatch(postCoupon(mockBody));
        const actionsTypes = extractActionTypes(mockStore.getActions());

        expect(actionsTypes).toEqual([
          postCoupon.pending.type,
          postCoupon.fulfilled.type
        ]);
      }
    );
    it('with "postCoupon" thunkAction and server response 400 - should dispatch postCoupon.pending and postCoupon.rejected actions',
      async () => {
        const mockServerResponse = 15;
        const mockBody = { coupon: 'any string' };
        const path = APIRoute.Coupons;
        mockAxiosAdapter.onPost(path).reply(400, mockServerResponse);

        await mockStore.dispatch(postCoupon(mockBody));
        const actionsTypes = extractActionTypes(mockStore.getActions());

        expect(actionsTypes).toEqual([
          postCoupon.pending.type,
          postCoupon.rejected.type
        ]);
      }
    );

    it('with "postOrders" thunkAction and server response 200 - should dispatch postOrders.pending and postOrders.fulfilled actions',
      async () => {
        const mockBody = {camerasIds: [], coupon: null };
        const path = APIRoute.Orders;
        mockAxiosAdapter.onPost(path).reply(200);

        await mockStore.dispatch(postOrders(mockBody));
        const actionsTypes = extractActionTypes(mockStore.getActions());

        expect(actionsTypes).toEqual([
          postOrders.pending.type,
          postOrders.fulfilled.type
        ]);
      }
    );
    it('with "postOrders" thunkAction and server response 400 - should dispatch postOrders.pending and postOrders.rejected actions',
      async () => {
        const mockServerResponse = 15;
        const mockBody = {camerasIds: [], coupon: 'any string' };
        const path = APIRoute.Orders;
        mockAxiosAdapter.onPost(path).reply(400, mockServerResponse);

        await mockStore.dispatch(postOrders(mockBody));
        const actionsTypes = extractActionTypes(mockStore.getActions());

        expect(actionsTypes).toEqual([
          postOrders.pending.type,
          postOrders.rejected.type
        ]);
      }
    );

  });

});
