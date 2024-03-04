import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import './banner-list.css';
import 'swiper/css/bundle';
import 'swiper/css';

import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getBannerCards, getIsBannerError } from '../../store/banner-store/banner-selectors';
import { useEffect } from 'react';
import { fetchBannerAction } from '../../store/api-actions/banner-action';
import { Banner } from '../banner/banner';


function BannerList(): JSX.Element {
  const bannerCards = useAppSelector(getBannerCards);
  const isBannerError = useAppSelector(getIsBannerError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBannerAction());
  }, [dispatch]);

  return (
    isBannerError
      ? <p>Не удалось загрузить изображение</p>
      : (
        <div className="banner" data-testid="bannerListDiv">
          <Swiper
            className="sample-swiper"
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 3000,

              pauseOnMouseEnter: true,
              disableOnInteraction: false,
              stopOnLastSlide: false
            }}
            speed={1000}
            loop

            pagination={{
              clickable: true,
            }}
            style={{ height: 280 }}
          >
            {bannerCards.map((card) => (
              <SwiperSlide key={card.id}>
                <Banner card={card} />
              </SwiperSlide>

            ))}

          </Swiper >


        </div >
      )
  );
}

export { BannerList };

