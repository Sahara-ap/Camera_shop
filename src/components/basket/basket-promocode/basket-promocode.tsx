import cn from 'classnames';
import React, { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getCouponSendingStatus } from '../../../store/basket-store/basket-selectors';
import { postCoupon } from '../../../store/api-actions/basket-actions';
import { setCouponSendingStatus } from '../../../store/basket-store/basket-slice';

import { removeSpacesFrom } from '../../../utils/utils-functions';
import { LoadingDataStatus } from '../../../consts';

function BasketPromocode(): JSX.Element {
  const dispatch = useAppDispatch();
  const [couponInput, setCouponInput] = useState('');
  const promoCodeRef = useRef<HTMLInputElement>(null);

  const sendingStatus = useAppSelector(getCouponSendingStatus);

  const body = { coupon: couponInput };

  function onApplyPromoCodeClick(event: React.MouseEvent) {
    event.preventDefault();
    dispatch(postCoupon(body));
    promoCodeRef.current?.focus();
  }

  function handlePromoCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const coupon = event.target.value;
    setCouponInput(removeSpacesFrom(coupon));
  }

  function handlePromoCodeBlur() {
    dispatch(setCouponSendingStatus(LoadingDataStatus.Unsent));
  }
  // очистка поля ввода промокода после получения ответа с сервера
  // const isCouponWasSended = sendingStatus === LoadingDataStatus.Success
  //   || sendingStatus === LoadingDataStatus.Error;

  // useEffect(() => {
  //   if (isCouponWasSended) {
  //     setCouponInput('');
  //   }
  // }, [isCouponWasSended]);

  return (
    <div className="basket__promo">
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
                onBlur={handlePromoCodeBlur}

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
