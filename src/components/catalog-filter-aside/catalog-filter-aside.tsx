import { useState } from 'react';
import { FilterCategory } from './filter-category/filter-category';
import { FilterType } from './filter-type/filter-type';
import { FilterLevel } from './filter-level/filter-level';
import { FilterPrice } from './filter-price/filter-price';

function CatalogFilterAside(): JSX.Element {
 

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>

          <FilterPrice />

          <FilterCategory />
          <FilterType />
          <FilterLevel />

          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export { CatalogFilterAside };
