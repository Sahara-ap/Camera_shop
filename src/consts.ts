enum APIRoute {
  Cameras = '/cameras',
  Banner = '/promo',
  Reviews = '/reviews',
  SelectedCamera = '/cameras',
  Similars = '/similar',
}

enum AppRoute {
  Catalog = '/',
  Basket = '/basket',
  Product = '/product',
  NotFound = '*'
}

enum CategoryName {
  Photo = 'photocamera',
  Video = 'videocamera',
}

const DELAY = 100;

enum NameSpace {
  App = 'APP',
  Banner = 'BANNER',
  Basket = 'BASKET',
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

enum SortingType {
  Price = 'price',
  Popular = 'popular',
  Non = ''
}
enum SortingOrder {
  Up = 'Up',
  Down = 'Down',
  Non = '',
}

export {
  APIRoute,
  AppRoute,
  CategoryName,
  DELAY,
  NameSpace,
  LoadingDataStatus,

  SortingType,
  SortingOrder,
};
