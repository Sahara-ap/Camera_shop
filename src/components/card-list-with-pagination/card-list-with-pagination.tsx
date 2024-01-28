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

  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const start = CARDS_NUMBER_PER_PAGE * (pageNumber - 1);
  const end = CARDS_NUMBER_PER_PAGE * pageNumber;
  const currentCameras = cameras.slice(start, end);

  const isCameraLoading = useAppSelector(getIsCamerasLoading);

  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      navigate(`${AppRoute.Catalog}?page=${DEFAULT_PAGE_NUMBER}`);
    }
    return () => {
      isMounted = false;
    };

  }, [navigate]);

  if (isCameraLoading) {
    return <Loading />;
  }
  return (
    <>
      <CardList cards={currentCameras} />
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
