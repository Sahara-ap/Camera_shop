import './filter-price.css';

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatPrice, getParams } from '../../../utils/utils-functions';
import { useAppSelector } from '../../../hooks/store-hooks';
import { getCameras } from '../../../store/cards-data-store/cards-data-selectors';

function FilterPrice(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const sortedCamears = cameras.slice().sort((cameraA, cameraB) => cameraA.price - cameraB.price);
  const startCameraPrice = sortedCamears.at(0)?.price;
  const endCameraPrice = sortedCamears.at(-1)?.price;
  const formatStartCameraPrice = formatPrice(startCameraPrice) || '';
  const formatEndCameraPrice = formatPrice(endCameraPrice) || '';

  console.log('startCameraPrice', startCameraPrice);
  console.log('endCameraPrice', endCameraPrice);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = getParams(searchParams);
  const minPriceParam = params.priceMin || '';
  const maxPriceParam = params.priceMax || '';


  const [minPriceState, setMinPriceState] = useState(minPriceParam || '');
  const [maxPriceState, setMaxPriceState] = useState(maxPriceParam || '');

  function handleMinPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputData = event.target.value;
    setMinPriceState(inputData);

    if (inputData) {
      setSearchParams({
        ...params,
        minPrice: inputData,
      });
    } else {
      return true;
    }
  }

  function handleMaxPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputData = event.target.value;
    setMaxPriceState(inputData);

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
              name="price"
              placeholder={`от ${formatStartCameraPrice}`}
              value={minPriceState}
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
              value={maxPriceState}
              onChange={handleMaxPriceChange}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { FilterPrice };
