import { TCameraCategory, TCameraLevel, TCameraType } from './types/generalTypes';

enum APIRoute {
  Cameras = '/cameras',
  Banner = '/promo',
  SelectedCamera = '/cameras',
}

enum AppRoute {
  Catalog = '/',
  Product = '/product',
  NotFound = '*'
}

const CAMERA_CATEGORIES:TCameraCategory[] = ['Видеокамера', 'Фотоаппарат'];
const CAMERA_LEVELS: TCameraLevel[] = ['Нулевой', 'Любительский', 'Профессиональный'];
const CAMERA_TYPES: TCameraType[] = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];

enum NameSpace {
  App = 'APP',
  Banner = 'BANNER',
  Cards = 'CARDS',
  SelectedCard = 'SELECTED_CARD',
}

export {
  APIRoute,
  AppRoute,
  CAMERA_CATEGORIES,
  CAMERA_LEVELS,
  CAMERA_TYPES,
  NameSpace,
};
