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

enum CategoryName {
  Photo = 'photocamera',
  Video = 'videocamera',
}

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

enum SortingType {
  Price = 'price',
  Popular = 'popular',
  Non = ''
}
enum SortingOrder {
  Up = 'Up',
  Down = 'Down',
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
