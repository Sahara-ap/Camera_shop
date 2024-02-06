import { TCameraCategory, TCameraLevel, TCameraType } from './types/generalTypes';

enum APIRoute {
  Cameras = '/cameras',
  Banner = '/promo',
  Reviews = '/reviews',
  SelectedCamera = '/cameras',
  Similars = '/similar',
}

enum AppRoute {
  Catalog = '/',
  Product = '/product',
  NotFound = '*'
}

const CAMERA_CATEGORIES:TCameraCategory[] = ['Видеокамера', 'Фотоаппарат'];
const CAMERA_LEVELS: TCameraLevel[] = ['Нулевой', 'Любительский', 'Профессиональный'];
const CAMERA_TYPES: TCameraType[] = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];

const DELAY = 100;

enum NameSpace {
  App = 'APP',
  Banner = 'BANNER',
  Cards = 'CARDS',
  Modals = 'MODALS',
  Reviews = 'REVIEWS',
  SelectedCard = 'SELECTED_CARD',
  Similar = 'SIMILAR',
}

enum LoadingDataStatus {
  Unsent = 'UNSENT',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export {
  APIRoute,
  AppRoute,
  CAMERA_CATEGORIES,
  CAMERA_LEVELS,
  CAMERA_TYPES,
  DELAY,
  NameSpace,
  LoadingDataStatus,
};
