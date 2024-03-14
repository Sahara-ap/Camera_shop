import './basket-order.css';

import cn from 'classnames';
import { useAppSelector } from '../../../hooks/store-hooks';
import { getBasketList, getDiscount, getTotalSum } from '../../../store/basket-store/basket-selectors';
import { formatPrice } from '../../../utils/utils-functions';

function BasketOrder(): JSX.Element {
  const totalSum = useAppSelector(getTotalSum);
  const discount = useAppSelector(getDiscount);
  const basketList = useAppSelector(getBasketList);
  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{formatPrice(totalSum)} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span
          className={cn(
            'basket__summary-value basket__summary-value--bonus',
            { 'basket__summary-value basket__summary-value--bonus--black': discount === 0 })}
        >
          {discount ? formatPrice(totalSum * discount) : 0} ₽
        </span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{formatPrice(totalSum * (1 - discount))} ₽</span>
      </p>
      <button
        className="btn btn--purple"
        type="submit"
        disabled={basketList.length === 0}
      >
        Оформить заказ
      </button>
    </div>
  );
}

export { BasketOrder };
