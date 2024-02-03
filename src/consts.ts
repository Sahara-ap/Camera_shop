import { TCameraCategory, TCameraLevel, TCameraType } from './types/generalTypes';

enum APIRoute {
  Cameras = '/cameras',
  Banner = '/promo',
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

enum NameSpace {
  App = 'APP',
  Banner = 'BANNER',
  Cards = 'CARDS',
  Modals = 'MODALS',
  SelectedCard = 'SELECTED_CARD',
  Similar = 'SIMILAR',
}

export {
  APIRoute,
  AppRoute,
  CAMERA_CATEGORIES,
  CAMERA_LEVELS,
  CAMERA_TYPES,
  NameSpace,
};
