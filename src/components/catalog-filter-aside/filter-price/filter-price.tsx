import './filter-price.css';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getCameras, getMinAndMaxCameraPrices } from '../../../store/cards-data-store/cards-data-selectors';

import { formatPrice, getParams } from '../../../utils/utils-functions';
import { getPriceFilterList } from '../../../store/app-data-store/app-data-selectors';
import { setPriceFilterList } from '../../../store/app-data-store/app-data-slice';

function FilterPrice(): JSX.Element {
  const dispatch = useAppDispatch();
  const priceFilterList = useAppSelector(getPriceFilterList);
  const cameras = useAppSelector(getCameras);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const minPriceParam = params.priceMin || '';
  const maxPriceParam = params.priceMax || '';

  useEffect(() => {
    const priceMinParam = Number(params.priceMin);
    const priceMaxParam = Number(params.priceMax);
    const priceList = [priceMinParam, priceMaxParam];

    dispatch(setPriceFilterList(priceList));

  }, []);

//для placeHolders
  const [startCameraPrice, endCameraPrice] = useAppSelector(getMinAndMaxCameraPrices);
  const formatStartCameraPrice = formatPrice(startCameraPrice) || '';
  const formatEndCameraPrice = formatPrice(endCameraPrice) || '';

  console.log('startCameraPrice', startCameraPrice);
  console.log('endCameraPrice', endCameraPrice);




  // const [minPriceState, setMinPriceState] = useState(minPriceParam || '');
  // const [maxPriceState, setMaxPriceState] = useState(maxPriceParam || '');

  function handleMinPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    let inputData = event.target.value || formatStartCameraPrice;
    if (inputData < formatStartCameraPrice) {
      inputData = formatStartCameraPrice;
    }
    if (inputData < '0') {
      inputData = formatStartCameraPrice;
    }
    params.priceMin = inputData;
    setSearchParams(params);
    // setMinPriceState(inputData);

    // if (inputData) {
    //   setSearchParams({
    //     ...params,
    //     minPrice: inputData,
    //   });
    // } else {
    //   return true;
    // }
  }

  function handleMaxPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    let inputData = event.target.value || formatEndCameraPrice;
    if (inputData > formatEndCameraPrice) {
      inputData = formatEndCameraPrice;
    }
    if (inputData < '0') {
      inputData = formatStartCameraPrice;
    }
    params.priceMin = inputData;
    setSearchParams(params);

    // setMaxPriceState(inputData);

    if (inputData) {
      setSearchParams({
        ...params,
        maxPrice: inputData,
      });
    } else {
      return true;
    }
  }


  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              min={0}
              name="price"
              placeholder={`от ${formatStartCameraPrice}`}
              // value={minPriceState}
              onChange={handleMinPriceChange}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={`до ${formatEndCameraPrice}`}
              // value={maxPriceState}
              onChange={handleMaxPriceChange}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { FilterPrice };
