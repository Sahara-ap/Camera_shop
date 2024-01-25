import { faker } from '@faker-js/faker';
import { TCard, TSelectedCard } from '../types/generalTypes';
import { pickRandomElement } from './utils-functions';
import { CAMERA_CATEGORIES, CAMERA_LEVELS, CAMERA_TYPES } from '../consts';


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


export {
  makeFakeCards,
  makeFakeSelectedCard,
};