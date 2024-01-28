import styles from './error-connection.module.css';

import { useAppDispatch } from '../../hooks/store-hooks';
import { fetchCamerasAction } from '../../store/api-actions/card-actions';

type TErrorConnectionProps = {
  page: 'catalog';
}
function ErrorConnection({ page }: TErrorConnectionProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleButtonClick() {
    switch (page) {
      case 'catalog':
        dispatch(fetchCamerasAction());
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

