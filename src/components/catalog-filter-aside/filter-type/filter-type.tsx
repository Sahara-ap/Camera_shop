import { useSearchParams } from 'react-router-dom';
import { getParams } from '../../../utils/utils-functions';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getTypeFilterList } from '../../../store/app-data-store/app-data-selectors';
import { useEffect } from 'react';
import { setTypeFilterList } from '../../../store/app-data-store/app-data-slice';
import { TCameraType } from '../../../types/general-types';
import { updateCheckedList, updateFilterParam } from '../filter-utils';

enum TypeParam {
  Collection = 'Коллекционная',
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snap = 'Моментальная',

}

const TYPES: {
  title: TypeParam;
  name: 'digital' | 'film' | 'snapshot' | 'collection';
  id: number;
}[] =
  [
    {
      title: TypeParam.Digital,
      name: 'digital',
      id: 21
    },
    {
      title: TypeParam.Film,
      name: 'film',
      id: 22
    },
    {
      title: TypeParam.Snap,
      name: 'snapshot',
      id: 23
    },
    {
      title: TypeParam.Collection,
      name: 'collection',
      id: 24
    },
  ];

function FilterType(): JSX.Element {
  const dispatch = useAppDispatch();
  const typeFilterList = useAppSelector(getTypeFilterList);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  useEffect(() => {
    const typeParams = params.type?.split('-') as TCameraType[] || [];
    dispatch(setTypeFilterList(typeParams));
  }, [dispatch, params.type]);

  function handleFilterToggle(title: TCameraType) {
    const typeCheckedList = [...typeFilterList];

    updateCheckedList(typeCheckedList, title);
    // dispatch(setTypeFilterList(typeCheckedList));

    updateFilterParam(params, 'type', typeCheckedList);
    setSearchParams(params);
  }


  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>

      {TYPES.map((type) => (
        <div key={type.id} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name={type.name}
              onChange={() => handleFilterToggle(type.title)}
              checked={typeFilterList.includes(type.title)}
              disabled={
                (/Видеокамера/.test(String(params.cat)))
                && (type.title === TypeParam.Snap || type.title === TypeParam.Film)
              }
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{type.title}</span>
          </label>
        </div>
      ))}

    </fieldset>
  );
}

export { FilterType };