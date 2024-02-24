import './filter-price.css';

import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getMinAndMaxCameraPrices } from '../../../store/cards-data-store/cards-data-selectors';

import { formatPrice, getParams } from '../../../utils/utils-functions';
import { setPriceMaxFilter, setPriceMinFilter } from '../../../store/app-data-store/app-data-slice';


function FilterPrice(): JSX.Element {

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const inputMinRef = useRef<HTMLInputElement | null>(null);
  const inputMaxRef = useRef<HTMLInputElement | null>(null);
  const [startCameraPrice, endCameraPrice] = useAppSelector(getMinAndMaxCameraPrices);

  useEffect(() => {
    const priceMinParam = params.priceMin || '';
    const priceMaxParam = params.priceMax || '';

    if (inputMinRef.current && inputMaxRef.current) {
      inputMinRef.current.value = priceMinParam;
      inputMaxRef.current.value = priceMaxParam;
    }

    dispatch(setPriceMinFilter(priceMinParam));
    dispatch(setPriceMaxFilter(priceMaxParam));

  }, [dispatch, params.priceMax, params.priceMin]);


  useEffect(() => {
    const priceMinParam = Number(params.priceMin);
    const priceMaxParam = Number(params.priceMax);

    if ((priceMaxParam < priceMinParam) && inputMinRef.current && inputMaxRef.current) {
      params.priceMin = String(startCameraPrice);
      params.priceMax = String(endCameraPrice);
      setSearchParams(params);

      inputMinRef.current.value = String(startCameraPrice);
      inputMaxRef.current.value = String(endCameraPrice);
    }
  }, [dispatch, setSearchParams, startCameraPrice, endCameraPrice, params.priceMin, params.priceMax, params]);


  function handleMinPriceBlur(eventValue: string) {
    // let inputValue = Number(event.currentTarget.value);
    let inputValue = Number(eventValue);

    if ((inputValue === 0) && (inputMinRef.current)) {
      inputValue = 0;
      inputMinRef.current.value = '';
    }
    if ((inputValue < startCameraPrice) && (inputValue !== 0) && (inputMinRef.current)) {
      inputValue = startCameraPrice;
      inputMinRef.current.value = String(startCameraPrice);
    }

    if (!inputValue) {
      delete params.priceMin;
    } else {
      params.priceMin = String(inputValue);
    }
    setSearchParams(params);

  }

  function handleMaxPriceBlur(eventValue: string) {
    let inputValue = Number(eventValue);

    if ((inputValue > endCameraPrice || inputValue < 0) && (inputMaxRef.current)) {
      inputValue = endCameraPrice;
      inputMaxRef.current.value = String(endCameraPrice);
    }

    if (!inputValue) {
      delete params.priceMax;
    } else {
      params.priceMax = String(inputValue);
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
              name="price"
              placeholder={`от ${formatPrice(startCameraPrice) || ''}`}
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
              name="priceUp"
              placeholder={`до ${formatPrice(endCameraPrice) || ''}`}
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
