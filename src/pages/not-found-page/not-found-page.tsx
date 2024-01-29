import styles from './not-found-page.module.css';

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';


function NotFoundPage(): JSX.Element {
  return (

    <div className={`${styles.notfound} decorated-page`}>
      <Helmet>
        <title>{'Not Found - Escape Room'}</title>
      </Helmet>
      <h1 className={styles.title}>404 NOT FOUND</h1>
      <h3>
        <Link to={AppRoute.Catalog}>Go to main page</Link>
      </h3>
    </div >

  );
}

export { NotFoundPage };
