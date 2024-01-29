import styles from './error-connection.module.css';

import { useAppDispatch } from '../../hooks/store-hooks';
import { fetchCamerasAction, fetchSelectedCameraAction } from '../../store/api-actions/card-actions';
import { useParams } from 'react-router-dom';

type TErrorConnectionProps = {
  page: 'catalog' | 'product';
}
function ErrorConnection({ page }: TErrorConnectionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {cardId} = useParams();

  function handleButtonClick() {
    switch (page) {
      case 'catalog':
        dispatch(fetchCamerasAction());
        break;
      case 'product':
        if (cardId) {
          dispatch(fetchSelectedCameraAction(cardId));
        }
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Не удалось загрузить данные</h1>
      <button
        onClick={handleButtonClick}
        className={styles.btn}
        type="button"
      >
        Попробовать ещё раз
      </button>

    </div>
  );
}

export { ErrorConnection };

