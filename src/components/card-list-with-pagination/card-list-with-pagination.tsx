import { CardList } from '../card-list/card-list';
import { useAppSelector } from '../../hooks/store-hooks';
import { getCameras, getIsCamerasLoading } from '../../store/cards-data-store/cards-data-selectors';
import { useState } from 'react';
import { Loading } from '../loading/loading';
import { CatalogPagination } from '../catalog-pagination/catalog-pagination';

const DEFAULT_PAGE_NUMBER = 1;
const CARDS_NUMBER_PER_PAGE = 9;

function CardListWithPagination(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  const totalCardsLength = cameras.length;
  const totalPages = Math.ceil(totalCardsLength / CARDS_NUMBER_PER_PAGE);

  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const start = CARDS_NUMBER_PER_PAGE * (pageNumber - 1);
  const end = CARDS_NUMBER_PER_PAGE * pageNumber;
  const currentCameras = cameras.slice(start, end);


  const isCameraLoading = useAppSelector(getIsCamerasLoading);

  if (isCameraLoading) {
    return <Loading />;
  }
  return (
    <>
      <CardList cards={currentCameras} />
      <CatalogPagination
        totalCardsLength={totalCardsLength}
        totalPages={totalPages}
        pageNumber={pageNumber}
        onPaginationClick={setPageNumber}
      />
    </>
  );
}

export { CardListWithPagination };
