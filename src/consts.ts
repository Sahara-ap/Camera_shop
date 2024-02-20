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

export {
  APIRoute,
  AppRoute,
  CategoryName,
  DELAY,
  NameSpace,
  LoadingDataStatus,
};
