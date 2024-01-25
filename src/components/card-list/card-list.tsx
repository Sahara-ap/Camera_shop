import { Card } from '../card/card';

import { TCard } from '../../types/generalTypes';

type TCardListProps = {
  cards: TCard[];
}
function CardList({cards}: TCardListProps): JSX.Element {


  return (
    <div className="cards catalog__cards">
      {cards.map((card) => (
        <Card
          key={card.id}
          cardData={card}
        />
      ))}

    </div>
  );
}

export { CardList };
