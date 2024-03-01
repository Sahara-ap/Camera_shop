import { faker } from '@faker-js/faker';
import { TBanner, TCard, TReview, TReviewPost, TSelectedCard, TSimilar } from '../types/general-types';
import { pickRandomElement } from './utils-functions';
import { State } from '../types/store';
import { Action } from '@reduxjs/toolkit';

import { LoadingDataStatus, NameSpace, SortingOrder, SortingType } from '../consts';
import { FULL_CATEGORY_FILTER_LIST, FULL_LEVEL_FILTER_LIST, FULL_TYPE_FILTER_LIST } from '../store/cards-data-store/cards-data-selectors';

const extractActionTypes = (actions: Action<string>[]) => actions.map((action) => action.type);

const makeFakeBanners = (): TBanner[] => new Array(3).fill(null).map(() => ({
  id: faker.number.int(),
  name: faker.lorem.words(3),
  previewImg: faker.internet.url(),
  previewImg2x: faker.internet.url(),
  previewImgWebp: faker.internet.url(),
  previewImgWebp2x: faker.internet.url(),
}));

const makeFakeCard = (): TCard => ({
  id: faker.number.int(),
  name: faker.lorem.words(3),
  vendorCode: faker.string.alpha(10),
  type: pickRandomElement(FULL_TYPE_FILTER_LIST),
  category: pickRandomElement(FULL_CATEGORY_FILTER_LIST),
  description: faker.lorem.lines(1),
  level: pickRandomElement(FULL_LEVEL_FILTER_LIST),
  price: faker.number.int({ min: 0, max: 100000 }),
  rating: faker.number.int({ min: 0, max: 10 }),
  reviewCount: faker.number.int({ min: 0, max: 1000 }),
  previewImg: faker.internet.url(),
  previewImg2x: faker.internet.url(),
  previewImgWebp: faker.internet.url(),
  previewImgWebp2x: faker.internet.url(),
});

const makeFakeCards = (): TCard[] => new Array(3).fill(null).map(() => ({
  id: faker.number.int(),
  name: faker.lorem.words(3),
  vendorCode: faker.string.alpha(10),
  type: pickRandomElement(FULL_TYPE_FILTER_LIST),
  category: pickRandomElement(FULL_CATEGORY_FILTER_LIST),
  description: faker.lorem.lines(1),
  level: pickRandomElement(FULL_LEVEL_FILTER_LIST),
  price: faker.number.int({ min: 0, max: 100000 }),
  rating: faker.number.int({ min: 0, max: 10 }),
  reviewCount: faker.number.int({ min: 0, max: 1000 }),
  previewImg: faker.internet.url(),
  previewImg2x: faker.internet.url(),
  previewImgWebp: faker.internet.url(),
  previewImgWebp2x: faker.internet.url(),
}));

const makeFakeReview = (): TReview => ({
  id: faker.string.uuid(),
  createAt: faker.string.numeric(),
  cameraId: faker.number.int(),
  userName: faker.person.fullName(),
  advantage: faker.lorem.lines(1),
  disadvantage: faker.lorem.lines(1),
  review: faker.lorem.lines(2),
  rating: faker.number.int({ min: 1, max: 5 }),
});

const makeFakeReviews = (): TReview[] => new Array(5).fill(null).map(() => ({
  id: faker.string.uuid(),
  createAt: faker.string.numeric(),
  cameraId: faker.number.int(),
  userName: faker.person.fullName(),
  advantage: faker.lorem.lines(1),
  disadvantage: faker.lorem.lines(1),
  review: faker.lorem.lines(2),
  rating: faker.number.int({ min: 1, max: 5 }),
}));


const makeFakeReviewPost = (): TReviewPost => ({
  cameraId: faker.number.int(),
  userName: faker.person.fullName(),
  advantage: faker.lorem.lines(1),
  disadvantage: faker.lorem.lines(1),
  review: faker.lorem.lines(2),
  rating: faker.number.int({ min: 1, max: 5 }),
});

const makeFakeSimilars = (): TSimilar[] => new Array(5).fill(null).map(() => ({
  id: faker.number.int(),
  name: faker.lorem.words(3),
  vendorCode: faker.string.alpha(10),
  type: pickRandomElement(FULL_TYPE_FILTER_LIST),
  category: pickRandomElement(FULL_CATEGORY_FILTER_LIST),
  description: faker.lorem.lines(1),
  level: pickRandomElement(FULL_LEVEL_FILTER_LIST),
  price: faker.number.int({ min: 0, max: 100000 }),
  rating: faker.number.int({ min: 0, max: 10 }),
  reviewCount: faker.number.int({ min: 0, max: 1000 }),
  previewImg: faker.internet.url(),
  previewImg2x: faker.internet.url(),
  previewImgWebp: faker.internet.url(),
  previewImgWebp2x: faker.internet.url(),
}));

const makeFakeSelectedCard = (): TSelectedCard => ({
  id: faker.number.int(),
  name: faker.lorem.words(3),
  vendorCode: faker.string.alpha(10),
  type: pickRandomElement(FULL_TYPE_FILTER_LIST),
  category: pickRandomElement(FULL_CATEGORY_FILTER_LIST),
  description: faker.lorem.lines(1),
  level: pickRandomElement(FULL_LEVEL_FILTER_LIST),
  price: faker.number.int({ min: 0, max: 100000 }),
  rating: faker.number.int({ min: 0, max: 10 }),
  reviewCount: faker.number.int({ min: 0, max: 1000 }),
  previewImg: faker.internet.url(),
  previewImg2x: faker.internet.url(),
  previewImgWebp: faker.internet.url(),
  previewImgWebp2x: faker.internet.url(),
});


const makeFakeBannerSlice = (initialState?: Partial<State>) => ({
  [NameSpace.Banner]: {
    bannerCards: makeFakeBanners(),
    isBannerCardLoading: false,
    isBannerError: false,
  },
  ...initialState ?? {}
});
const makeFakeCardsSlice = (initialState?: Partial<State>) => ({
  [NameSpace.Cards]: {
    cameras: makeFakeCards(),
    isCamerasLoading: false
  },
  ...initialState ?? {}
});

const makeFakeCardsAndProductSlice = (initialState?: Partial<State>) => ({
  [NameSpace.Cards]: {
    cameras: makeFakeCards(),
    isCamerasLoading: false
  },
  [NameSpace.SelectedCard]: {
    selectedCamera: makeFakeSelectedCard(),
    isSelectedCameraLoading: false
  },
  ...initialState ?? {}
});

const makeFakeModalAndProductSlice = (initialState?: Partial<State>) => ({
  [NameSpace.Modals]: {
    isBuyProductActive: false,
    productData: null,

    isReviewModalActive: false,
    isReviewModalSuccessActive: false,
  },
  [NameSpace.SelectedCard]: {
    selectedCamera: makeFakeSelectedCard(),
    isSelectedCameraLoading: false
  },
  ...initialState ?? {}
});

const makeFakeModalAndProductAndReviewSlice = (initialState?: Partial<State>) => ({
  [NameSpace.Modals]: {
    isBuyProductActive: false,
    productData: null,

    isReviewModalActive: false,
    isReviewModalSuccessActive: false,
  },
  [NameSpace.SelectedCard]: {
    selectedCamera: makeFakeSelectedCard(),
    isSelectedCameraLoading: false
  },
  [NameSpace.Reviews]: {
    reviews: makeFakeReviews(),
    isReviewLoading: false,
    reviewSendingStatus: LoadingDataStatus.Unsent,
  },
  ...initialState ?? {}
});
const makeFakeReviewSlice = (initialState?: Partial<State>) => ({
  [NameSpace.Reviews]: {
    reviews: makeFakeReviews(),
    isReviewLoading: false,
    reviewSendingStatus: LoadingDataStatus.Unsent,
  },
  ...initialState ?? {}
});

const makeFakeModalSlice = (initialState?: Partial<State>) => ({
  [NameSpace.Modals]: {
    isBuyProductActive: false,
    productData: null,

    isReviewModalActive: false,
    isReviewModalSuccessActive: false,
  },
  ...initialState ?? {}
});

const makeFakeSimilarAndAppSlice = (initialState?: Partial<State>) => ({
  [NameSpace.App]: {
    errorServerResponse: null,
    hasErrorWithConnection: false,
  },
  [NameSpace.Similar]: {
    similars: makeFakeSimilars(),
    isSimilarsLoading: false,
  },
  ...initialState ?? {}
});

const makeFakeState = (initialState?: Partial<State>) => ({
  [NameSpace.App]: {
    errorServerResponse: null,
    hasErrorWithConnection: false,

    priceMinFilter: '',
    priceMaxFilter: '',
    categoryFilterList: [],
    typeFilterList: [],
    levelFilterList: [],

    sortType: SortingType.Non,
    sortOrder: SortingOrder.Non
  },
  [NameSpace.Banner]: {
    bannerCards: makeFakeBanners(),
    isBannerCardLoading: false,
    isBannerError: false
  },
  [NameSpace.Cards]: {
    cameras: makeFakeCards(),
    isCamerasLoading: false
  },
  [NameSpace.Modals]: {
    isBuyProductActive: false,
    productData: null,

    isReviewModalActive: false,
    isReviewModalSuccessActive: false,
  },
  [NameSpace.Reviews]: {
    reviews: makeFakeReviews(),
    isReviewLoading: false,
    reviewSendingStatus: LoadingDataStatus.Unsent,
  },
  [NameSpace.SelectedCard]: {
    selectedCamera: makeFakeSelectedCard(),
    isSelectedCameraLoading: false
  },
  [NameSpace.Similar]: {
    similars: makeFakeSimilars(),
    isSimilarsLoading: false,
  },
  ...initialState ?? {}
});


export {
  extractActionTypes,

  makeFakeBanners,
  makeFakeCard,
  makeFakeCards,

  makeFakeReview,
  makeFakeReviews,
  makeFakeReviewPost,

  makeFakeSelectedCard,
  makeFakeSimilars,

  makeFakeBannerSlice,
  makeFakeCardsSlice,
  makeFakeCardsAndProductSlice,
  makeFakeModalAndProductSlice,
  makeFakeModalAndProductAndReviewSlice,
  makeFakeReviewSlice,
  makeFakeModalSlice,
  makeFakeSimilarAndAppSlice,

  makeFakeState,
};
