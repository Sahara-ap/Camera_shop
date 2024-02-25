import { TCameraCategory, TCameraLevel, TCameraType, TParamsCatalog } from '../../types/general-types';

function updateCheckedList<T extends Array<string>, U extends string>(list: T, title: U) {
  const currentIndex = list.indexOf(title);
  if (currentIndex === -1) {
    list.push(title);
  } else {
    list.splice(currentIndex, 1);
  }
}

type TCameraFilters = TCameraCategory | TCameraType | TCameraLevel
function updateFilterParam(params: TParamsCatalog, paramKey: keyof TParamsCatalog, checkedFilterList: TCameraFilters[]) {
  if (checkedFilterList.length !== 0) {
    params[paramKey] = checkedFilterList.join('-');
  } else {
    delete params[paramKey];
  }
}

function isUserPriceLowerThanPlaceholderValue (userPrice:number, placeholderValue: number) {
  return userPrice < placeholderValue;
}
function isPriceEmpty (price: string) {
  return price === '';
}


export {
  updateCheckedList,
  updateFilterParam,

  isUserPriceLowerThanPlaceholderValue,
  isPriceEmpty,
};
