import './filter-price.css';

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getCameras, getMinAndMaxCameraPrices } from '../../../store/cards-data-store/cards-data-selectors';

import { formatPrice, getParams } from '../../../utils/utils-functions';
import { getPriceMaxFilter, getPriceMinFilter } from '../../../store/app-data-store/app-data-selectors';
import { setPriceMaxFilter, setPriceMinFilter } from '../../../store/app-data-store/app-data-slice';


function FilterPrice(): JSX.Element {
  const dispatch = useAppDispatch();
  const minPriceFilter = useAppSelector(getPriceMinFilter);
  const maxPriceFilter = useAppSelector(getPriceMaxFilter);
  const cameras = useAppSelector(getCameras);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const minPriceParam = params.priceMin || '';
  const maxPriceParam = params.priceMax || '';

  useEffect(() => {
    const priceMinParam = params.priceMin || '';
    const priceMaxParam = params.priceMax || '';

    dispatch(setPriceMinFilter(priceMinParam));
    dispatch(setPriceMaxFilter(priceMaxParam));

  }, []);

  //для placeHolders
  const [startCameraPrice, endCameraPrice] = useAppSelector(getMinAndMaxCameraPrices);
  const formatStartCameraPrice = formatPrice(startCameraPrice) || '';
  const formatEndCameraPrice = formatPrice(endCameraPrice) || '';

  console.log('minPriceFilter', minPriceFilter);
  console.log('maxPriceFilter', maxPriceFilter);



  // const [minPriceState, setMinPriceState] = useState(minPriceParam || '');
  // const [maxPriceState, setMaxPriceState] = useState(maxPriceParam || '');

  function handleMinPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    // let preparedInputValue = '';

    // if (inputValue < startCameraPrice) {
    //   preparedInputValue = startCameraPrice;
    // }
    // preparedInputValue = inputValue;

    // if (preparedInputValue === "0") delete params.priceMin;


    // код ниже дублирует условие кода выше
    // if (inputValue < '0') {
    //   inputValue = formatStartCameraPrice;
    // }

    const inputValue = event.target.value;
    if (!inputValue) {
      delete params.priceMin;
    } else {
      params.priceMin = inputValue;
    }
    setSearchParams(params);
    dispatch(setPriceMinFilter(inputValue));

  }

  function handleMaxPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    if (!inputValue) {
      delete params.priceMax;
    } else {
      params.priceMax = inputValue;
    }
    setSearchParams(params);
    dispatch(setPriceMaxFilter(inputValue));
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
              value={minPriceFilter}
              // onBlur={handleMinPriceBlur}
              // onChange={(event) => dispatch(setPriceFilterList([Number(event.target.value), 0]))}
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
              value={maxPriceFilter}
              onChange={handleMaxPriceChange}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { FilterPrice };
