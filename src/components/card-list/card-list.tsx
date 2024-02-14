import { Card } from '../card/card';
import { TCard } from '../../types/general-types';
import cn from 'classnames';

type TCardListProps = {
  cards: TCard[];
  page: 'catalog' | 'similar';
}
function CardList({ cards, page }: TCardListProps): JSX.Element {


  return (
    <div
      data-testid="divElement"
      className={cn({
        'cards catalog__cards': page === 'catalog',
        'product-similar__slider-list': page === 'similar'
      })}

    >
      {cards.map((card) => (
        <Card
          key={card.id}
          cardData={card}
          page={page}

        />
      ))}

    </div>
  );
}

export { CardList };
