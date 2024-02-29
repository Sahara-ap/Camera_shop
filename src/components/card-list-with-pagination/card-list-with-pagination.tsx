import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getFilteredAndSortedCameras, getIsCamerasLoading } from '../../store/cards-data-store/cards-data-selectors';
import { useAppSelector } from '../../hooks/store-hooks';

import { CardList } from '../card-list/card-list';
import { Loading } from '../loading/loading';
import { CatalogPagination } from '../catalog-pagination/catalog-pagination';
import { getParams } from '../../utils/utils-functions';


const DEFAULT_PAGE_NUMBER = 1;
const CARDS_NUMBER_PER_PAGE = 9;
const MIN_PAGES = 2;

function CardListWithPagination(): JSX.Element {

  const isCamerasLoading = useAppSelector(getIsCamerasLoading);

  const preparedCameraList = useAppSelector(getFilteredAndSortedCameras);


  const totalCardsLength = preparedCameraList.length;
  const totalPages = Math.ceil(totalCardsLength / CARDS_NUMBER_PER_PAGE);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const page = params.page || DEFAULT_PAGE_NUMBER;

  const [pageNumber, setPageNumber] = useState(Number(page));

  const start = CARDS_NUMBER_PER_PAGE * (pageNumber - 1);
  const end = CARDS_NUMBER_PER_PAGE * pageNumber;
  const currentCameras = preparedCameraList.slice(start, end);


  useEffect(() => {
    let isMounted = true;

    if (isMounted && (totalPages !== 0) && ((pageNumber > totalPages) || (pageNumber < 1))) {
      params.page = String(DEFAULT_PAGE_NUMBER);
      setSearchParams(params);
      setPageNumber(DEFAULT_PAGE_NUMBER);
    }
    return () => {
      isMounted = false;
    };
  }, [totalPages, pageNumber, params, setSearchParams]);

  if (isCamerasLoading) {
    return <Loading />;
  }

  return (
    <>
      <CardList cards={currentCameras} page='catalog' />
      {totalPages >= MIN_PAGES &&
        <CatalogPagination
          totalPages={totalPages}
          onPaginationClick={setPageNumber}
          params={params}
        />}

    </>
  );
}

export { CardListWithPagination };
