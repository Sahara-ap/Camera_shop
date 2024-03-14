import { Helmet } from 'react-helmet-async';
import { getBasketList } from '../../store/basket-store/basket-selectors';
import { useAppSelector } from '../../hooks/store-hooks';

import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { BasketList } from '../../components/basket/basket-list/basket-list';
import { BasketSummary } from '../../components/basket/basket-summary/basket-summary';

function BasketPage(): JSX.Element {
  const basketList = useAppSelector(getBasketList);

  return (
    <>
      <Helmet><title>{'Каталог - Корзина'}</title></Helmet>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs page='basket' />

          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>

              <BasketList basketList={basketList} />
              <BasketSummary />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>

  );
}

export { BasketPage };
