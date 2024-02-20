import { useSearchParams } from 'react-router-dom';
import { getParams } from '../../../utils/utils-functions';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getTypeFilterList } from '../../../store/app-data-store/app-data-selectors';
import { useEffect } from 'react';
import { setCategoryFilterList, setTypeFilterList } from '../../../store/app-data-store/app-data-slice';
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
  }, []);

  function handleFilterToggle(title: TCameraType) {
    const typeCheckedList = [...typeFilterList];

    // const currentIndex = updatedLevelCheckedList.indexOf(title);
    // if (currentIndex === -1) {
    //   updatedLevelCheckedList.push(title);
    // } else {
    //   updatedLevelCheckedList.splice(currentIndex, 1);
    // }
    updateCheckedList(typeCheckedList, title);
    dispatch(setTypeFilterList(typeCheckedList));

    updateFilterParam(typeCheckedList, params, 'type');

    // if (typeCheckedList.length !== 0) {
    //   params.type = typeCheckedList.join('-');
    // } else {
    //   delete params.type;
    // }
    setSearchParams(params);

    // if (updatedLevelCheckedList.includes(TypeParam.Film)) {
    //   params.cat = 'Фотоаппарат';
    //   setSearchParams(params);
      // dispatch(setCategoryFilterList(['Фотоаппарат']));
      // const catList = params.cat?.split('-') || [];
      // const index = catList.indexOf('Видеокамера');
      // if (index !== -1) {
        // catList.splice(index, 1);
      // }
    // }
    // if (updatedLevelCheckedList.includes(TypeParam.Snap)) {
    //   params.cat = params.cat = 'Фотоаппарат';
    //   setSearchParams(params);
      // dispatch(setCategoryFilterList(['Фотоаппарат']));
      // const catList = params.cat?.split('-') || [];
      // const index = catList.indexOf('Видеокамера');
      // if (index !== -1) {
        // catList.splice(index, 1);
      // }
    // }
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
