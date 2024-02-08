import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  function getPageNumber() {
    const url = new URL(window.location.href);
    const params = Object.fromEntries(url.searchParams);
    const { page } = params;

    return page;
  }
  const initialPageNumber = Number(getPageNumber() ?? 1);
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(initialPageNumber);

  const start = CARDS_NUMBER_PER_PAGE * (pageNumber - 1);
  const end = CARDS_NUMBER_PER_PAGE * pageNumber;
  const currentCameras = cameras.slice(start, end);

  const isCamerasLoading = useAppSelector(getIsCamerasLoading);


  useEffect(() => {
    let isMounted = true;

    if (isMounted && (totalPages !== 0) && (pageNumber > totalPages)) {
      navigate(`${AppRoute.Catalog}?page=${DEFAULT_PAGE_NUMBER}`);
      setPageNumber(DEFAULT_PAGE_NUMBER);
    }
    return () => {
      isMounted = false;
    };
  }, [totalPages, pageNumber, navigate]);

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
