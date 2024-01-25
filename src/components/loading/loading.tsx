import preloader from '../../../public/img/svg/preloader.svg';
import styles from './loading.module.css';

import { useAppSelector } from '../../hooks/store-hooks';
import { getIsCamerasLoading } from '../../store/cards-data-store/cards-data-selectors';
import { getIsSelectedCameraLoading } from '../../store/selected-card-data-store/selected-card-data-selectors';

function Loading(): JSX.Element | null {
  const isCamerasLoading = useAppSelector(getIsCamerasLoading);
  const isSelectedCameraLoading = useAppSelector(getIsSelectedCameraLoading);

  return (
    (isCamerasLoading || isSelectedCameraLoading)
      ? (
        <div className={styles.preloader}>
          <img src={preloader} alt="Preloader" />
        </div>
      )
      : null
  );
}

export { Loading };
