import './basket-order.css';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getBasketList, getDiscount, getIsPostOrdersSending, getTotalSum } from '../../../store/basket-store/basket-selectors';
import { postOrders } from '../../../store/api-actions/basket-actions';
import { getCouponSendingStatusFromStorage, getCouponValueFromStorage } from '../../../services/localStorage';

import { formatPrice } from '../../../utils/utils-functions';
import { LoadingDataStatus } from '../../../consts';

function BasketOrder(): JSX.Element {
  const dispatch = useAppDispatch();

  const basketList = useAppSelector(getBasketList);
  const coupon = getCouponValueFromStorage();
  const couponStatus = getCouponSendingStatusFromStorage();
  const validCoupon = couponStatus === LoadingDataStatus.Success ? coupon : null;

  const totalSum = useAppSelector(getTotalSum);
  const discount = useAppSelector(getDiscount);
  const isSending = useAppSelector(getIsPostOrdersSending);

  const isButtonDisabled =
    basketList.length === 0
    || isSending;

  function handleOrderButtonClick(event: React.MouseEvent) {
    event.preventDefault();
    const body = {
      camerasIds: basketList.map((camera) => camera.id),
      coupon: validCoupon,
    };
    dispatch(postOrders(body));
  }

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
        disabled={isButtonDisabled}
        onClick={handleOrderButtonClick}
      >
        Оформить заказ
      </button>
    </div>
  );
}

export { BasketOrder };
