import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { setCategoryFilterList } from '../../../store/app-data-store/app-data-slice';
import { getCategoryFilterList } from '../../../store/app-data-store/app-data-selectors';

import { getParams } from '../../../utils/utils-functions';
import { TCameraCategory } from '../../../types/general-types';
import { updateCheckedList, updateFilterParam } from '../filter-utils';

enum CategoryParam {
  Video = 'Видеокамера',
  Photo = 'Фотоаппарат',
}

const CATEGORIES: {
  title: CategoryParam;
  name: 'photocamera' | 'videocamera';
  id: number;
}[] =
  [
    {
      title: CategoryParam.Photo,
      name: 'photocamera',
      id: 11
    },
    {
      title: CategoryParam.Video,
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
  }, []);


  function handleFilterToggle(title: TCameraCategory) {
    const categoryCheckedList = [...categoryFilterList];

    const currentIndex = categoryCheckedList.indexOf(title);
    if (currentIndex === -1) {
      categoryCheckedList.push(title);
    } else {
      categoryCheckedList.splice(currentIndex, 1);
    }
    dispatch(setCategoryFilterList(categoryCheckedList));

    if (categoryCheckedList.length !== 0) {
      params.cat = categoryCheckedList.join('-');
    } else {
      delete params.cat;
    }
    setSearchParams(params);
  }

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>

      {CATEGORIES.map((it) => (
        <div key={it.id} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name={it.name}
              onChange={() => handleFilterToggle(it.title)}
              checked={categoryFilterList.includes(it.title)}
              disabled={
                ('cat' in params) && (params.cat !== it.title)
                // || (it.title === CategoryParam.Video) && (/Плёночная|Моментальная/.test(String(params.type)))
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
