import './filter-price.css';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getMinAndMaxCameraPrices } from '../../../store/cards-data-store/cards-data-selectors';

import { format, formatPrice, formatStringToNumber, getParams } from '../../../utils/utils-functions';
import { getPriceMaxFilter, getPriceMinFilter } from '../../../store/app-data-store/app-data-selectors';
import { setPriceMaxFilter, setPriceMinFilter } from '../../../store/app-data-store/app-data-slice';


function FilterPrice(): JSX.Element {

  const dispatch = useAppDispatch();
  const minPriceFilter = useAppSelector(getPriceMinFilter);
  const maxPriceFilter = useAppSelector(getPriceMaxFilter);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const [inputMin, setInputMin] = useState(params.priceMin || '');
  const [inputMax, setInputMax] = useState(params.priceMax || '');


  useEffect(() => {
    const priceMinParam = params.priceMin || '';
    const priceMaxParam = params.priceMax || '';

    dispatch(setPriceMinFilter(priceMinParam));
    dispatch(setPriceMaxFilter(priceMaxParam));

  }, [dispatch, params.priceMax, params.priceMin]);

  //для placeHolders
  const [startCameraPrice, endCameraPrice] = useAppSelector(getMinAndMaxCameraPrices);
  const formatStartCameraPrice = formatPrice(startCameraPrice) || '';
  const formatEndCameraPrice = formatPrice(endCameraPrice) || '';

  console.log('minPriceFilter', minPriceFilter);
  console.log('maxPriceFilter', maxPriceFilter);


  function handleMinPriceBlur(event: React.ChangeEvent<HTMLInputElement>) {

    let inputValue = Number(event.target.value);
    console.log('inputvalue', inputValue);

    if (inputValue < startCameraPrice) {
      inputValue = startCameraPrice;
      setInputMin(String(startCameraPrice));
    }


    if (!inputValue) {
      delete params.priceMin;
    } else {
      params.priceMin = String(inputValue);
    }
    setSearchParams(params);
    // dispatch(setPriceMinFilter(String(inputValue)));

  }

  function handleMaxPriceBlur(event: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = Number(event.target.value);

    if (inputValue > endCameraPrice) {
      inputValue = endCameraPrice;
      setInputMax(String(endCameraPrice));
    }

    if (!inputValue) {
      delete params.priceMax;
    } else {
      params.priceMax = String(inputValue);
    }
    setSearchParams(params);
    // dispatch(setPriceMaxFilter(String(inputValue)));
  }


  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽
      </legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="text"
              name="price"
              placeholder={`от ${formatStartCameraPrice}`}
              value={inputMin}
              onChange={(event) => setInputMin(event.target.value)}
              onBlur={handleMinPriceBlur}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="text"
              name="priceUp"
              placeholder={`до ${formatEndCameraPrice}`}
              value={inputMax}
              onChange={(event) => setInputMax(event.target.value)}
              onBlur={handleMaxPriceBlur}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { FilterPrice };
