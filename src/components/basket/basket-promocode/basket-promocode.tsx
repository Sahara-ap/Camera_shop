import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getCouponSendingStatus, getPostOrdersSendingStatus } from '../../../store/basket-store/basket-selectors';
import { postCoupon } from '../../../store/api-actions/basket-actions';
import { setCouponValue } from '../../../store/basket-store/basket-slice';

import { removeSpacesFrom } from '../../../utils/utils-functions';
import { LoadingDataStatus } from '../../../consts';
import { getCouponValueFromStorage } from '../../../services/localStorage';

function BasketPromocode(): JSX.Element {
  const dispatch = useAppDispatch();

  const [couponInput, setCouponInput] = useState(getCouponValueFromStorage());
  const promoCodeRef = useRef<HTMLInputElement>(null);


  const sendingCouponStatus = useAppSelector(getCouponSendingStatus);
  const sendingOrderStatus = useAppSelector(getPostOrdersSendingStatus);
  useEffect(() => {
    let isMounted = true;
    if (isMounted && sendingOrderStatus === LoadingDataStatus.Success) {
      setCouponInput('');
    }
    return (() => {
      isMounted = false;
    });
  }, [sendingOrderStatus]);


  function onApplyPromoCodeClick(event: React.MouseEvent) {
    event.preventDefault();

    const body = { coupon: couponInput};
    dispatch(postCoupon(body));
    dispatch(setCouponValue(couponInput)); // нужен для однообразия, чтобы сохранять в LS и удалять только в одном единственном месте!

    promoCodeRef.current?.focus();
  }

  function handlePromoCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const coupon = event.target.value;
    const couponWithoutSpaces = removeSpacesFrom(coupon);
    setCouponInput(couponWithoutSpaces);
  }


  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action="#">
          <div
            className={cn('custom-input', {
              'is-invalid': sendingCouponStatus === LoadingDataStatus.Error,
              'is-valid': sendingCouponStatus === LoadingDataStatus.Success
            })}
          >
            <label><span className="custom-input__label">Промокод</span>
              <input
                ref={promoCodeRef}
                type="text"
                name="promo"
                placeholder="Введите промокод"
                value={couponInput} onChange={handlePromoCodeChange}

              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button
            className="btn"
            type="submit"
            onClick={(event) => onApplyPromoCodeClick(event)}
          >
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export { BasketPromocode };
