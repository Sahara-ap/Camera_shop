import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/store-hooks';
import { setSelectedCamera } from '../../store/selected-card-data-store/selected-card-data-slice';
import { setIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-slice';

import { formatPrice } from '../../utils/utils-functions';
import { AppRoute } from '../../consts';
import { TCard } from '../../types/generalTypes';

type TCardProps = {
  cardData: TCard;
}
function Card({ cardData }: TCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleButtonClick() {
    dispatch(setIsBuyProductActive(true));
    dispatch(setSelectedCamera(cardData));
  }

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${cardData.previewImgWebp}, ${cardData.previewImgWebp2x} 2x`} /><img src={cardData.previewImg} srcSet={`${cardData.previewImg2x} 2x`} width="280" height="240" alt={cardData.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: {cardData.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{cardData.reviewCount}</p>
        </div>
        <p className="product-card__title">{cardData.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(cardData.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          onClick={handleButtonClick}
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${cardData.id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export { Card };
