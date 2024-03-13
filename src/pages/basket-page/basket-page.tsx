import './basket-page.css';

import { Helmet } from 'react-helmet-async';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getBasketList, getCouponSendingStatus, getDiscount, getTotalSum } from '../../store/basket-store/basket-selectors';
import { BasketList } from '../../components/basket-list/basket-list';
import { formatPrice, removeSpacesFrom } from '../../utils/utils-functions';
import { postCoupon } from '../../store/api-actions/basket-actions';
import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { LoadingDataStatus } from '../../consts';
import { setCouponSendingStatus } from '../../store/basket-store/basket-slice';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [couponInput, setCouponInput] = useState('');
  const promoCodeRef = useRef<HTMLInputElement>(null);


  const basketList = useAppSelector(getBasketList);
  const totalSum = useAppSelector(getTotalSum);
  const discount = useAppSelector(getDiscount);
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
  // const isCouponWasSended = sendingStatus === LoadingDataStatus.Success
  //   || sendingStatus === LoadingDataStatus.Error;

  // useEffect(() => {
  //   if (isCouponWasSended) {
  //     setCouponInput('');
  //   }
  // }, [isCouponWasSended]);

  return (
    <>
      <Helmet><title>{'Каталог - Корзина'}</title></Helmet>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs page='basket' />

          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>

              <BasketList basketList={basketList} />

              <div className="basket__summary">
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

                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{formatPrice(totalSum)} ₽</span></p>
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
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{formatPrice(totalSum * (1 - discount))} ₽</span></p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>

  );
}

export { BasketPage };
