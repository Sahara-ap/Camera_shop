import './basket-order.css';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getBasketList, getDiscount, getPostOrdersSendingStatus, getTotalSum } from '../../../store/basket-store/basket-selectors';
import { postOrders } from '../../../store/api-actions/basket-actions';
import { getCouponSendingStatusFromStorage, getCouponValueFromStorage } from '../../../services/localStorage';

import { formatPrice } from '../../../utils/utils-functions';
import { LoadingDataStatus } from '../../../consts';
import { ModalBasketSuccess } from '../../modal-basket-success/modal-basket-success';
import { setPostOrdersSendingStatusToUnsent } from '../../../store/basket-store/basket-slice';

function BasketOrder(): JSX.Element {
  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector(getPostOrdersSendingStatus);

  const isModalActive = sendingStatus === LoadingDataStatus.Error || sendingStatus === LoadingDataStatus.Success;

  const basketList = useAppSelector(getBasketList);
  const emptyBasket = basketList.length === 0;
  const camerasIds = basketList.map((camera) => camera.id);


  const totalSum = useAppSelector(getTotalSum);
  const discount = useAppSelector(getDiscount);

  const coupon = getCouponValueFromStorage();
  const couponStatus = getCouponSendingStatusFromStorage();
  const isCouponAccepted = couponStatus === LoadingDataStatus.Success;
  const validCoupon = isCouponAccepted ? coupon : null;

  const isButtonDisabled =
    emptyBasket
    || sendingStatus === LoadingDataStatus.Pending;

  function closeModal() {
    dispatch(setPostOrdersSendingStatusToUnsent());
  }

  function handleOrderButtonClick(event: React.MouseEvent) {
    event.preventDefault();
    const body = {
      camerasIds,
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
      {isModalActive &&
        <ModalBasketSuccess onClick={closeModal} />}
    </div>
  );
}

export { BasketOrder };
