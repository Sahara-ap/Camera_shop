import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { setCategoryFilterList } from '../../../store/app-data-store/app-data-slice';
import { getCategoryFilterList } from '../../../store/app-data-store/app-data-selectors';

import { getParams } from '../../../utils/utils-functions';
import { TCameraCategory } from '../../../types/general-types';
import { updateCheckedList, updateFilterParam } from '../utils/filter-utils';

enum CategoryParam {
  Video = 'Видеокамера',
  Photo = 'Фотокамера',
}
enum CategoryTitleFromServer {
  Video = 'Видеокамера',
  Photo = 'Фотоаппарат',
}

const CATEGORIES: {
  title: CategoryParam;
  titleFromServer: CategoryTitleFromServer;
  name: 'photocamera' | 'videocamera';
  id: number;
}[] =
  [
    {
      title: CategoryParam.Photo,
      titleFromServer: CategoryTitleFromServer.Photo,
      name: 'photocamera',
      id: 11
    },
    {
      title: CategoryParam.Video,
      titleFromServer: CategoryTitleFromServer.Video,
      name: 'videocamera',
      id: 12
    },
  ];


function FilterCategory(): JSX.Element {
  const dispatch = useAppDispatch();
  const categoryFilterList = useAppSelector(getCategoryFilterList);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  useEffect(() => {
    const catParams = params.cat?.split('-') as TCameraCategory[] || [];
    dispatch(setCategoryFilterList(catParams));
  }, [dispatch, params.cat]);


  function handleFilterToggle(title: TCameraCategory) {
    const categoryCheckedList = [...categoryFilterList];

    updateCheckedList(categoryCheckedList, title);

    updateFilterParam(params, 'cat', categoryCheckedList);
    setSearchParams(params);
  }


  return (
    <fieldset className="catalog-filter__block" data-testid="filterCategoryElement">
      <legend className="title title--h5">Категория</legend>

      {CATEGORIES.map((it) => (
        <div key={it.id} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name={it.name}
              onChange={() => handleFilterToggle(it.titleFromServer)}
              checked={categoryFilterList.includes(it.titleFromServer)}
              disabled={
                ('cat' in params) && (params.cat !== it.titleFromServer)
              }
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{it.title}</span>
          </label>
        </div>
      ))}

    </fieldset>
  );
}

export { FilterCategory };
