import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import './selected-product-similar.css';
import 'swiper/css/bundle';

import { useAppSelector } from '../../hooks/store-hooks';
import { getSimilars } from '../../store/similars-store/similars-selectors';
import { Card } from '../card/card';

function SelectedProductSimilar(): JSX.Element | null {
  const similars = useAppSelector(getSimilars);

  if (similars.length === 0) {
    return null;
  }
  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">

          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              <Swiper
                className="product-similar__slider-list"
                modules={[Navigation]}
                slidesPerView={3}
                slidesPerGroup={3}
                allowTouchMove={false}
                watchSlidesProgress
                speed={1500}

                navigation={{
                  enabled: true,
                  nextEl: '.slider-controls--next',
                  prevEl: '.slider-controls--prev',
                }}

              >
                {similars.map((card) => (
                  <SwiperSlide key={card.id}>
                    <Card cardData={card} page='similar' />
                  </SwiperSlide>

                ))}

              </Swiper >
            </div>

            <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>

          </div>
        </div>
      </section>
    </div>
  );
}

export { SelectedProductSimilar };
