type TCard = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}
type TCameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная'
type TCameraCategory = 'Видеокамера' | 'Фотоаппарат'
type TCameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный'

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

export type {
  TCard,
  TCameraType,
  TCameraCategory,
  TCameraLevel,
  TSelectedCard,
};
