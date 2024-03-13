import { SortingOrder, SortingType } from '../consts';

type TBanner = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

type TBasketCard = TSelectedCard & {
  count: number;
}

type TCard = {
  id: number;
  name: string;
  vendorCode: string;
  type: TCameraType;
  category: TCameraCategory;
  description: string;
  level: TCameraLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}
type TCameraCategory = 'Видеокамера' | 'Фотокамера' | 'Фотоаппарат'
type TCameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный'
type TCameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная'

type TCameraId = string

type TCouponBody = {
  coupon: string;
}
type TCouponResponse = number

type TPage = 'catalog' | 'product' | 'basket'

type TParamsCatalog = {
  cat?: TCameraCategory | string;
  type?: TCameraType | string;
  level?: TCameraLevel | string;
  page?: string;
  priceMin?: string;
  priceMax?: string;
  prices?: string;
  sortType?: SortingType;
  sortOrder?: SortingOrder;
}

type TReview = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

type TReviewPost = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

type TSelectedCard = {
  id: number;
  name: string;
  vendorCode: string;
  type: TCameraType;
  category: TCameraCategory;
  description: string;
  level: TCameraLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}


type TSimilar = {
  id: number;
  name: string;
  vendorCode: string;
  type: TCameraType;
  category: TCameraCategory;
  description: string;
  level: TCameraLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type {
  TBanner,
  TBasketCard,
  TCard,
  TCameraType,
  TCameraId,
  TCouponBody,
  TCouponResponse,
  TCameraCategory,
  TCameraLevel,
  TPage,
  TParamsCatalog,
  TReview,
  TReviewPost,
  TSelectedCard,
  TSimilar,
};
