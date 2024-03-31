import { FilterCategory } from './filter-category/filter-category';
import { FilterType } from './filter-type/filter-type';
import { FilterLevel } from './filter-level/filter-level';
import { FilterPrice } from './filter-price/filter-price';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '../../utils/utils-functions';

function CatalogFilterAside(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const hasSomeFiltersInParams = Object.keys(params).some((paramName) => paramName.includes('price') || paramName.includes('level') || paramName.includes('cat') || paramName.includes('type'));
  const isEmptyFilterParams = !hasSomeFiltersInParams;

  function handleResetClick(event: React.MouseEvent) {
    event.preventDefault();

    if (hasSomeFiltersInParams) {
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
      <div data-testid="catalogFilterAsideDivElement" className="catalog-filter">
        <form
          action="#"
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
            disabled={isEmptyFilterParams}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export { CatalogFilterAside };
