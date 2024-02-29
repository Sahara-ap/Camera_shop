import './filter-price.css';

import React, { useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getMinAndMaxCameraPrices } from '../../../store/cards-data-store/cards-data-selectors';

import { formatPrice, getParams } from '../../../utils/utils-functions';
import { setPriceMaxFilter, setPriceMinFilter } from '../../../store/app-data-store/app-data-slice';
import { isSomethingInputed, isUserPriceLowerThanPlaceholderValue } from '../utils/filter-utils';


function FilterPrice(): JSX.Element {

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const inputMinRef = useRef<HTMLInputElement | null>(null);
  const inputMaxRef = useRef<HTMLInputElement | null>(null);
  const [startPriceOfCameraList, endPriceOfCameraList] = useAppSelector(getMinAndMaxCameraPrices);

  const placeholderStartValue = startPriceOfCameraList;
  const placeholderEndValue = endPriceOfCameraList;

  useLayoutEffect(() => {
    const priceMinParam = params.priceMin || '';
    const priceMaxParam = params.priceMax || '';

    if (inputMinRef.current && inputMaxRef.current) {
      inputMinRef.current.value = priceMinParam;
      inputMaxRef.current.value = priceMaxParam;
    }

    dispatch(setPriceMinFilter(priceMinParam));
    dispatch(setPriceMaxFilter(priceMaxParam));

  }, [dispatch, params.priceMax, params.priceMin]);


  useLayoutEffect(() => {
    const priceMinParam = Number(params.priceMin);
    const priceMaxParam = Number(params.priceMax);

    if (
      priceMaxParam < priceMinParam
      && inputMinRef.current
      && inputMaxRef.current
    ) {

      params.priceMin = String(placeholderStartValue);
      params.priceMax = String(placeholderEndValue);
      setSearchParams(params);

      inputMinRef.current.value = String(placeholderStartValue);
      inputMaxRef.current.value = String(placeholderEndValue);
    }
  }, [dispatch, setSearchParams, placeholderStartValue, placeholderEndValue, params.priceMin, params.priceMax, params]);


  function handleMinPriceBlur(price: string) {
    let userMinPriceValue = Number(price);

    if ((price === '') && (inputMinRef.current)) {
      userMinPriceValue = 0;
      inputMinRef.current.value = '';
    }
    if (
      isUserPriceLowerThanPlaceholderValue(userMinPriceValue, placeholderStartValue)
      && isSomethingInputed(price)
      && (inputMinRef.current)
    ) {
      userMinPriceValue = placeholderStartValue;
      inputMinRef.current.value = String(placeholderStartValue);
    }

    if (!userMinPriceValue) {
      delete params.priceMin;
    } else {
      params.priceMin = String(userMinPriceValue);
    }
    setSearchParams(params);

  }

  function handleMaxPriceBlur(price: string) {
    let userMaxPriceValue = Number(price);

    if (
      (userMaxPriceValue > placeholderEndValue || userMaxPriceValue < 0)
      && (inputMaxRef.current)
    ) {
      userMaxPriceValue = placeholderEndValue;
      inputMaxRef.current.value = String(placeholderEndValue);
    }

    if (!userMaxPriceValue) {
      delete params.priceMax;
    } else {
      params.priceMax = String(userMaxPriceValue);
    }
    setSearchParams(params);
  }

  function handleMinPriceKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    const eventValue = event.currentTarget.value;
    if (event.key.startsWith('Enter')) {
      handleMinPriceBlur(eventValue);
    }
  }

  function handleMaxPriceKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    const eventValue = event.currentTarget.value;
    if (event.key.startsWith('Enter')) {
      handleMaxPriceBlur(eventValue);
    }
  }

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽
      </legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              min={0}
              name="price"
              placeholder={`от ${formatPrice(placeholderStartValue) || ''}`}
              onBlur={(event) => handleMinPriceBlur(event.currentTarget.value)}
              ref={inputMinRef}
              onKeyDown={handleMinPriceKeydown}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              min={0}
              name="priceUp"
              placeholder={`до ${formatPrice(placeholderEndValue) || ''}`}
              onBlur={(event) => handleMaxPriceBlur(event.currentTarget.value)}
              ref={inputMaxRef}
              onKeyDown={handleMaxPriceKeydown}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { FilterPrice };
