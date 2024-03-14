import { useAppSelector } from '../../../hooks/store-hooks';
import { getIsRemoveFromBasketActive } from '../../../store/modal-windows-store/modal-windows-selectors';
import { TBasketCard } from '../../../types/general-types';
import { BasketItem } from '../basket-item/basket-item';
import { ModalBasketRemoveItem } from '../../modal-basket-remove-item/modal-basket-remove-item';

type TBasketListProps = {
  basketList: TBasketCard[];
}
function BasketList({ basketList }: TBasketListProps): JSX.Element {
  const isRemoveItemModalActive = useAppSelector(getIsRemoveFromBasketActive);

  return (
    <ul className="basket__list">
      {basketList.map((item) => <BasketItem key={item.id} card={item} />
      )}

      {isRemoveItemModalActive && <ModalBasketRemoveItem isActive={isRemoveItemModalActive}/>}

    </ul>
  );
}

export { BasketList };
