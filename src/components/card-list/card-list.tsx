import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { fetchCamerasAction } from '../../store/api-actions/card-action';
import { getCameras } from '../../store/cards-data-store/cards-data-selectors';
import { Card } from '../card/card';

function CardList(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

  const cameras = useAppSelector(getCameras);

  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => (
        <Card
          key={camera.id}
          cardData={camera}
        />
      ))}

    </div>
  );
}

export { CardList };
