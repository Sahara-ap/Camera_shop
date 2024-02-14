import { Link } from 'react-router-dom';
import { TBanner } from '../../types/general-types';
import { AppRoute } from '../../consts';

type TBannerProps = {
  card: TBanner;
}
function Banner({card}: TBannerProps): JSX.Element {
  return (
    <>
      <picture>
        <source
          type="image/webp"
          srcSet={`${card.previewImgWebp}, ${card.previewImgWebp2x} 2x`}
        />
        <img
          src={card.previewImg}
          srcSet={`${card.previewImg2x} 2x`} width="1280" height="280" alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{card.name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${AppRoute.Product}/${card.id}`}>Подробнее</Link>
      </p>
    </>

  );
}

export { Banner };
