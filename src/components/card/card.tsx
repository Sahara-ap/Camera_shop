import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch } from '../../hooks/store-hooks';
import { setSelectedCamera } from '../../store/selected-card-data-store/selected-card-data-slice';
import { setIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-slice';

import { formatPrice } from '../../utils/utils-functions';
import { AppRoute } from '../../consts';
import { TCard } from '../../types/general-types';
import { RatingStars } from '../rating-stars/rating-stars';


type TCardProps = {
  cardData: TCard;
  page: 'catalog' | 'similar';
}
function Card({ cardData, page }: TCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleButtonClick() {
    dispatch(setIsBuyProductActive(true));
    dispatch(setSelectedCamera(cardData));
  }


  return (
    <div className={cn('product-card', { 'is-active': page === 'similar' })} >
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${cardData.previewImgWebp}, ${cardData.previewImgWebp2x} 2x`}
          />
          <img
            src={cardData.previewImg}
            srcSet={`${cardData.previewImg2x} 2x`} width="280" height="240"
            alt={cardData.name}
          />
        </picture>
      </div>

      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars rating={cardData.rating} />
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
          data-testid="buttonElement"
        >
          Купить
        </button>
        <Link
          className="btn btn--transparent"
          to={`${AppRoute.Product}/${cardData.id}`}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export { Card };
