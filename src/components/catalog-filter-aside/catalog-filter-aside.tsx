import { FilterCategory } from './filter-category/filter-category';
import { FilterType } from './filter-type/filter-type';
import { FilterLevel } from './filter-level/filter-level';
import { FilterPrice } from './filter-price/filter-price';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '../../utils/utils-functions';

function CatalogFilterAside(): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  function handleResetClick() {
    const hasSomeFilters = Object.keys(params).some((paramName) => paramName.includes('price') || paramName.includes('level') || paramName.includes('cat') || paramName.includes('type'));

    if (hasSomeFilters) {
      delete params.page;
    }
    delete params.cat;
    delete params.type;
    delete params.level;
    delete params.priceMin;
    delete params.priceMax;

    setSearchParams(params);
  }
  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form
          action="#"
          ref={formRef}
        >
          <h2 className="visually-hidden">Фильтр</h2>
          <FilterPrice />

          <FilterCategory />
          <FilterType />
          <FilterLevel />


          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={handleResetClick}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export { CatalogFilterAside };
