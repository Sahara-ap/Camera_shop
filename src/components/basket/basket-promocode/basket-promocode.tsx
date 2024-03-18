import cn from 'classnames';
import React, { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getCouponSendingStatus, getCouponValue } from '../../../store/basket-store/basket-selectors';
import { postCoupon } from '../../../store/api-actions/basket-actions';
import { setCouponValue } from '../../../store/basket-store/basket-slice';

import { removeSpacesFrom } from '../../../utils/utils-functions';
import { LoadingDataStatus } from '../../../consts';
import { saveCouponValueToStorage } from '../../../services/localStorage';

function BasketPromocode(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoCodeRef = useRef<HTMLInputElement>(null);

  const couponInput = useAppSelector(getCouponValue);

  const sendingStatus = useAppSelector(getCouponSendingStatus);


  function onApplyPromoCodeClick(event: React.MouseEvent) {
    event.preventDefault();

    const body = { coupon: couponInput};
    saveCouponValueToStorage(body.coupon);
    dispatch(postCoupon(body));

    promoCodeRef.current?.focus();
  }

  function handlePromoCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const coupon = event.target.value;
    const couponWithoutSpaces = removeSpacesFrom(coupon);
    dispatch(setCouponValue(couponWithoutSpaces));
  }


  return (
    <div className="basket__promo" data-testid="basketPromocodeDiv">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action="#">
          <div
            className={cn('custom-input', {
              'is-invalid': sendingStatus === LoadingDataStatus.Error,
              'is-valid': sendingStatus === LoadingDataStatus.Success
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
