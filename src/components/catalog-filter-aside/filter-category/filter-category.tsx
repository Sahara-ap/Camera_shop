import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '../../../utils/utils-functions';
import { TParamsCatalog } from '../../../types/generalTypes';

const CATEGORIES = [
  {
    title: 'Фотокамера',
    name: 'photocamera',
    shortcut: 'photo',
    id: 11
  },
  {
    title: 'Видеокамера',
    name: 'videocamera',
    shortcut: 'video',
    id: 12
  },
];

enum FilterTitleShortcut {
  Page = 'page',
  Category = 'cat',
  Level = 'lv',
  Type = 'type',
  PriceMin = 'pmin',
  PriceMax = 'pmax',
}

enum FilterCategoryShortcuts {
  Photo = 'ph',
  Video = 'vd',
}
enum FilterTypeShortcuts {
  Digital = 'dg',
  film = 'fl',
  Snap = 'sn',
  Collection = 'coll',
}

enum FilterLevelShortcuts {
  Zero = 'z',
  Professional = 'prof',
  NonProffesional = 'nprof'
}

function FilterCategory(): JSX.Element {

  const [checkedList, setCheckedList] = useState<TParamsCatalog['cat'][]>([]); //стейт для union входящих фильтров
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategoryParam = searchParams.get(FilterTitleShortcut.Category);

  const params = getParams(searchParams) as TParamsCatalog || {};
  const [currentParams, setCurrentParams] = useState(params); //стейт для хранения актуальных параметров. Нужен ли он?

  function handleFilterToggle(shortcut: TParamsCatalog['cat']) {

    const updateCheckedList = [...checkedList];

    const currentIndex = checkedList.indexOf(shortcut);
    if (currentIndex === -1) {
      updateCheckedList.push(shortcut);
    } else {
      updateCheckedList.splice(currentIndex, 1);
    }

    setCheckedList(updateCheckedList);
    setCurrentParams({
      ...currentParams,
      cat: shortcut,
    });


    setSearchParams({
      ...params,
      cat: String(shortcut)
    });
  }

  let par = [];
  const entries = searchParams.entries()
  for (const entrie of entries) {
    par.push(entrie)
  }

  // console.log('searchParams', getParams(searchParams));
  // console.log('entries from filterCategory', entries);
  // console.log('sp from filterCategory', searchParams);
  // console.log('par from filterCategory', par);
  console.log('params from filterCategory', params);


  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>

      {CATEGORIES.map((it) => (
        <div key={it.id} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name={it.name}
              onChange={() => handleFilterToggle(it.shortcut as TParamsCatalog['cat'])}
              checked={checkedList.includes(it.shortcut as TParamsCatalog['cat'])}
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
