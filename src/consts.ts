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

enum NameSpace {
  App = 'APP',
  Banner = 'BANNER',
  Cards = 'CARDS',
  SelectedCard = 'SELECTED_CARD',
}

const CAMERA_TYPES: TCameraType[] = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];
const CAMERA_CATEGORIES:TCameraCategory[] = ['Видеокамера', 'Фотоаппарат'];
const CAMERA_LEVELS: TCameraLevel[] = ['Нулевой', 'Любительский', 'Профессиональный'];


export {
  APIRoute,
  AppRoute,
  NameSpace,
  CAMERA_TYPES,
  CAMERA_CATEGORIES,
  CAMERA_LEVELS,
};
