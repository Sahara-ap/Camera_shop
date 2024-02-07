import { faker } from '@faker-js/faker';
import { TBanner, TCard, TReview, TReviewPost, TSelectedCard, TSimilar } from '../types/generalTypes';
import { pickRandomElement } from './utils-functions';
import { CAMERA_CATEGORIES, CAMERA_LEVELS, CAMERA_TYPES } from '../consts';


const makeFakeBanners = (): TBanner[] => new Array(3).fill(null).map(() => ({
  id: faker.number.int(),
  name: faker.lorem.words(3),
  previewImg: faker.internet.url(),
  previewImg2x: faker.internet.url(),
  previewImgWebp: faker.internet.url(),
  previewImgWebp2x: faker.internet.url(),
}));


const makeFakeCards = (): TCard[] => new Array(3).fill(null).map(() => ({
  id: faker.number.int(),
  name: faker.lorem.words(3),
  vendorCode: faker.string.alpha(10),
  type: pickRandomElement(CAMERA_TYPES),
  category: pickRandomElement(CAMERA_CATEGORIES),
  description: faker.lorem.lines(1),
  level: pickRandomElement(CAMERA_LEVELS),
  price: faker.number.int({ min: 0, max: 100000 }),
  rating: faker.number.int({ min: 0, max: 10 }),
  reviewCount: faker.number.int({ min: 0, max: 1000 }),
  previewImg: faker.internet.url(),
  previewImg2x: faker.internet.url(),
  previewImgWebp: faker.internet.url(),
  previewImgWebp2x: faker.internet.url(),
}));

const makeFakeSimilars = (): TSimilar[] => new Array(5).fill(null).map(() => ({
  id: faker.number.int(),
  name: faker.lorem.words(3),
  vendorCode: faker.string.alpha(10),
  type: pickRandomElement(CAMERA_TYPES),
  category: pickRandomElement(CAMERA_CATEGORIES),
  description: faker.lorem.lines(1),
  level: pickRandomElement(CAMERA_LEVELS),
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
  type: pickRandomElement(CAMERA_TYPES),
  category: pickRandomElement(CAMERA_CATEGORIES),
  description: faker.lorem.lines(1),
  level: pickRandomElement(CAMERA_LEVELS),
  price: faker.number.int({ min: 0, max: 100000 }),
  rating: faker.number.int({ min: 0, max: 10 }),
  reviewCount: faker.number.int({ min: 0, max: 1000 }),
  previewImg: faker.internet.url(),
  previewImg2x: faker.internet.url(),
  previewImgWebp: faker.internet.url(),
  previewImgWebp2x: faker.internet.url(),
});


const makeFakeReviews = (): TReview[] => new Array(5).fill(null).map(() => ({
  id: faker.string.uuid(),
  createAt: faker.string.numeric(),
  cameraId: faker.number.int(),
  userName: faker.person.fullName(),
  advantage: faker.lorem.lines(1),
  disadvantage: faker.lorem.lines(1),
  review: faker.lorem.lines(2),
  rating: faker.number.int({min: 1, max: 5}),
}));


const makeFakeReviewPost = (): TReviewPost => ({
  cameraId: faker.number.int(),
  userName: faker.person.fullName(),
  advantage: faker.lorem.lines(1),
  disadvantage: faker.lorem.lines(1),
  review: faker.lorem.lines(2),
  rating: faker.number.int({min: 1, max: 5}),
});


export {
  makeFakeBanners,
  makeFakeCards,
  makeFakeSelectedCard,
  makeFakeSimilars,
  makeFakeReviews,
  makeFakeReviewPost,
};
