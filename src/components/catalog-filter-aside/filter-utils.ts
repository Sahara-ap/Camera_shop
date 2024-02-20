import { TCameraCategory, TCameraLevel, TCameraType, TCard, TParamsCatalog } from '../../types/general-types';

const filterByPrice = (cards: TCard[], minValue = '', maxValue = '') => (
  cards.filter((card) => card.price >= Number(minValue) && card.price <= Number(maxValue)
  ));

const filterByCategory = (cards: TCard[], filterValue: TCameraCategory) => cards.filter((card) => card.category === filterValue);

const filterByCameraType = (cards: TCard[], filterValue: TCameraType) => cards.filter((card) => card.type === filterValue);

const filterByLevel = (cards: TCard[], filterValue: TCameraLevel) => cards.filter((card) => card.level === filterValue);


const combineFilters = <T extends TCard[]>(...filterResults: T) => {
  const result = filterResults.reduce<TCard[]>((acc, filter) => {
    const unions = acc.concat(filter);
    return unions;
  }, []);
  return result;
};

const getFilterResult = (cards: TCard[], ...filters: TCard[]) => {
  const filtersList = combineFilters(...filters);

  const cardCountMap = filtersList.reduce<Record<TCard['vendorCode'], number>>((acc, item) => {
    const vendorCode = item.vendorCode;
    acc[vendorCode] = (acc[vendorCode] || 0) + 1;
    return acc;
  }, {});
  const filteredNameList = Object.keys(cardCountMap).filter((key) => cardCountMap[key] > 1);

  const result = cards.filter((card) => {
    filteredNameList.includes(card.vendorCode);
  });

  return result;
};

type TFilterValues = TCameraCategory | TCameraType | TCameraLevel
function filterCards(cards: TCard[], ...filterValues: TFilterValues[]) {
  const [category, type, level] = filterValues;
  cards.filter((card) => (
    card.category === category
    && card.type === type
    && card.level === level
  ));
}






function updateCheckedList<T extends Array<string>, U extends string>(list: T, title: U) {
  const currentIndex = list.indexOf(title);
  if (currentIndex === -1) {
    list.push(title);
  } else {
    list.splice(currentIndex, 1);
  }
}

type TCameraFilters = TCameraCategory | TCameraType | TCameraLevel
function updateFilterParam(checkedFilterList: TCameraFilters[], params: TParamsCatalog, paramKey: keyof TParamsCatalog) {
  if (checkedFilterList.length !== 0) {
    params[paramKey] = checkedFilterList.join('-');
  } else {
    delete params[paramKey];
  }
}


export {
  filterByPrice,
  filterByCategory,
  filterByCameraType,
  filterByLevel,

  combineFilters,
  getFilterResult,

  updateCheckedList,
  updateFilterParam,
};
