import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getCameras, getIsCamerasLoading } from '../../store/cards-data-store/cards-data-selectors';
import { useAppSelector } from '../../hooks/store-hooks';

import { CardList } from '../card-list/card-list';
import { Loading } from '../loading/loading';
import { CatalogPagination } from '../catalog-pagination/catalog-pagination';

import { AppRoute } from '../../consts';

const DEFAULT_PAGE_NUMBER = 1;
const CARDS_NUMBER_PER_PAGE = 9;
const MIN_PAGES = 2;

function CardListWithPagination(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  const totalCardsLength = cameras.length;
  const totalPages = Math.ceil(totalCardsLength / CARDS_NUMBER_PER_PAGE);

  const [searchParams, setSearchParams] = useSearchParams({page: '1'});
  const page = searchParams.get('page');
  // console.log('page', page)
  function getUrl() {
    return new URL(window.location.href);
  }

  function getPageNumber() {
    const url = getUrl();
    const params = Object.fromEntries(url.searchParams);
    const { page } = params;

    return page;
  }
  // const initialPageNumber = Number(getPageNumber() ?? 1);
  const initialPageNumber = Number(page) ?? 1;
  // const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(initialPageNumber);

  const start = CARDS_NUMBER_PER_PAGE * (pageNumber - 1);
  const end = CARDS_NUMBER_PER_PAGE * pageNumber;
  const currentCameras = cameras.slice(start, end);

  const isCamerasLoading = useAppSelector(getIsCamerasLoading);

  // const params = Object.fromEntries(getUrl().searchParams);
  const params = Object.fromEntries(searchParams);
  console.log('params from CLwithPag', params);


  useEffect(() => {
    let isMounted = true;



    if (isMounted && (totalPages !== 0) && (pageNumber > totalPages)) {
      // navigate(`${AppRoute.Catalog}?page=${DEFAULT_PAGE_NUMBER}`);
      setSearchParams({
        ...params,
        page: String(DEFAULT_PAGE_NUMBER)});
      setPageNumber(DEFAULT_PAGE_NUMBER);
    }
    return () => {
      isMounted = false;
    };
  }, [totalPages, pageNumber]);

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
        />}

    </>
  );
}

export { CardListWithPagination };
