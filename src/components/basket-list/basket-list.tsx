import { TBasketCard } from '../../types/general-types';
import { BasketItem } from '../basket-item/basket-item';

type TBasketListProps = {
  basketList: TBasketCard[];
}
function BasketList({ basketList }: TBasketListProps): JSX.Element {
  return (
    <ul className="basket__list">
      {basketList.map((item) => (
        <BasketItem key={item.id} card={item} />
      ))}
    </ul>
  );
}

export { BasketList };