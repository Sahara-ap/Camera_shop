import { useAppSelector } from '../../hooks/store-hooks';
import { getCameras } from '../../store/cards-data-store/cards-data-selectors';
import { Card } from '../card/card';

function CardList(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  console.log('cameras', cameras);

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
