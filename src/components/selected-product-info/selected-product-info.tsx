import { useAppSelector } from '../../hooks/store-hooks';
import { getSelectedCamera } from '../../store/selected-card-data-store/selected-card-data-selectors';

function SelectedProductInfo(): JSX.Element | null {
  const info = useAppSelector(getSelectedCamera);

  if (!info) {
    return null;
  }
  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source type="image/webp" srcSet={`${info.previewImgWebp}, ${info.previewImgWebp2x} 2x`} />
              <img src={info.previewImg} srcSet={`${info.previewImgWebp2x} 2x`} width="560" height="480" alt={info.name} />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{info.name}</h1>
            <div className="rate product__rate">
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
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="17" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <p className="visually-hidden">Рейтинг: {info.rating}</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{info.reviewCount}</p>
            </div>
            <p className="product__price"><span className="visually-hidden">Цена:</span>{info.price} ₽</p>
            <button className="btn btn--purple" type="button">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                <button className="tabs__control" type="button">Характеристики</button>
                <button className="tabs__control is-active" type="button">Описание</button>
              </div>
              <div className="tabs__content">
                <div className="tabs__element">
                  <ul className="product__tabs-list">
                    <li className="item-list"><span className="item-list__title">Артикул:</span>
                      <p className="item-list__text"> {info.vendorCode}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Категория:</span>
                      <p className="item-list__text">{info.category}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                      <p className="item-list__text">{info.type}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Уровень:</span>
                      <p className="item-list__text">{info.level}</p>
                    </li>
                  </ul>
                </div>
                <div className="tabs__element is-active">
                  <div className="product__tabs-text">
                    <p>{info.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}

export { SelectedProductInfo };
