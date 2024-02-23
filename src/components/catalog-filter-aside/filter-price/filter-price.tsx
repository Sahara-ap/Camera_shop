import './filter-price.css';

import { useEffect, useRef } from 'react';
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


  useEffect(() => {
    const priceMinParam = params.priceMin || '';
    const priceMaxParam = params.priceMax || '';

    dispatch(setPriceMinFilter(priceMinParam));
    dispatch(setPriceMaxFilter(priceMaxParam));

  }, [dispatch, params.priceMax, params.priceMin]);

  const [startCameraPrice, endCameraPrice] = useAppSelector(getMinAndMaxCameraPrices);
  const formatStartCameraPrice = formatPrice(startCameraPrice) || '';
  const formatEndCameraPrice = formatPrice(endCameraPrice) || '';


  useEffect(() => {
    const min = Number(params.priceMin);
    const max = Number(params.priceMax);

    if ((max < min) && inputMinRef.current && inputMaxRef.current) {
      params.priceMin = String(startCameraPrice);
      params.priceMax = String(endCameraPrice);
      setSearchParams(params);

      inputMinRef.current.value = String(startCameraPrice);
      inputMaxRef.current.value = String(endCameraPrice);
    }
  }, [dispatch, endCameraPrice, params, setSearchParams, startCameraPrice]);

  function handleMinPriceBlur(event: React.ChangeEvent<HTMLInputElement>) {

    let inputValue = Number(event.target.value);

    if ((inputValue < startCameraPrice) && inputMinRef.current) {
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

  function handleMaxPriceBlur(event: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = Number(event.target.value);

    if ((inputValue > endCameraPrice) && inputMaxRef.current) {
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
              onBlur={handleMinPriceBlur}
              ref={inputMinRef}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="text"
              name="priceUp"
              placeholder={`до ${formatEndCameraPrice}`}
              onBlur={handleMaxPriceBlur}
              ref={inputMaxRef}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { FilterPrice };
