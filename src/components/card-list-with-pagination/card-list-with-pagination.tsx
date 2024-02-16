import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getCameras, getIsCamerasLoading } from '../../store/cards-data-store/cards-data-selectors';
import { useAppSelector } from '../../hooks/store-hooks';

import { CardList } from '../card-list/card-list';
import { Loading } from '../loading/loading';
import { CatalogPagination } from '../catalog-pagination/catalog-pagination';
import { getFilterCategoryList } from '../../store/app-data-store/app-data-selectors';
import { CategoryName } from '../../consts';


const DEFAULT_PAGE_NUMBER = 1;
const CARDS_NUMBER_PER_PAGE = 9;
const MIN_PAGES = 2;
const categoryMap = {
  [CategoryName.Video]: 'Видеокамера',
  [CategoryName.Photo]: 'Фотоаппарат',
};

function CardListWithPagination(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const categoryFilters = useAppSelector(getFilterCategoryList);
  const []

  const totalCardsLength = cameras.length;
  const totalPages = Math.ceil(totalCardsLength / CARDS_NUMBER_PER_PAGE);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

  const initialPageNumber = page || 1;

  const [pageNumber, setPageNumber] = useState(Number(initialPageNumber));

  const start = CARDS_NUMBER_PER_PAGE * (pageNumber - 1);
  const end = CARDS_NUMBER_PER_PAGE * pageNumber;
  const currentCameras = cameras.slice(start, end);

  const isCamerasLoading = useAppSelector(getIsCamerasLoading);

  const params = Object.fromEntries(searchParams);
  // console.log('params from CLwithPag', params);


  useEffect(() => {
    let isMounted = true;

    if (isMounted && (totalPages !== 0) && ((pageNumber > totalPages) || (pageNumber < 1))) {
      setSearchParams({
        ...params,
        page: String(DEFAULT_PAGE_NUMBER)});
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
          pageNumber={pageNumber}
          onPaginationClick={setPageNumber}
          params={params}
        />}

    </>
  );
}

export { CardListWithPagination };
