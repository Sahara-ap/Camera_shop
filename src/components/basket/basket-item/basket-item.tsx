import { useAppDispatch } from '../../../hooks/store-hooks';
import { decrementBasketItem, incrementBasketItem, setBasketRemovedItem, setItemCount } from '../../../store/basket-store/basket-slice';
import { setIsRemoveFromBasketActive } from '../../../store/modal-windows-store/modal-windows-slice';
import { TBasketCard } from '../../../types/general-types';
import { formatPrice, reduceFirstLetter } from '../../../utils/utils-functions';

type TBasketItemProps = {
  card: TBasketCard;
}
function BasketItem({ card }: TBasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const modal = {
    openRemoveWindow: () => dispatch(setIsRemoveFromBasketActive(true)),
  };

  function handleCountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const count = event.target.value;
    dispatch(setItemCount({ id: card.id, count }));
  }

  function handleRemoveButtonClick() {
    modal.openRemoveWindow();
    dispatch(setBasketRemovedItem(card));
  }


  return (
    <li className="basket-item" data-testid="basketItemLi">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${card.previewImgWebp}, ${card.previewImgWebp2x} 2x`} />
          <img src={card.previewImg} srcSet={`${card.previewImg2x} 2x`} width={140} height={120} alt={card.name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{card.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{card.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{card.type} {reduceFirstLetter(card.category)}</li>
          <li className="basket-item__list-item">{card.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formatPrice(card.price)} ₽</p>

      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={() => dispatch(decrementBasketItem({id: card.id, count: 1}))}
          disabled={card.count <= 1}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>

        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          value={card.count}
          onChange={handleCountChange}
          min="1" max="99"
          aria-label="количество товара"
        />

        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => dispatch(incrementBasketItem({id: card.id, count: 1}))}
          disabled={card.count >= 99}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>

      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{formatPrice(card.price * card.count)} ₽</div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleRemoveButtonClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>

  );
}

export { BasketItem };
