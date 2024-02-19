import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '../../../utils/utils-functions';
import { CategoryName } from '../../../consts';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { setFilterCategoryList } from '../../../store/app-data-store/app-data-slice';
import { getFilterCategoryList } from '../../../store/app-data-store/app-data-selectors';
import { TCameraCategory, TParamsCatalog } from '../../../types/generalTypes';

enum FilterShortcutsList {
  Photo = 'photo',
  Video = 'video',
  Digital = 'digital',
  film = 'film',
  Snap = 'snap',
  Collection = 'colllection',
  Zero = 'zero',
  Professional = 'proffesional',
  NonProffesional = 'nonproffecional'
}

enum CategoryParam {
  Video = 'Видеокамера',
  Photo = 'Фотоаппарат',
}

const CATEGORIES: {
  title: CategoryParam;
  name: CategoryName;
  id: number;
}[] =
  [
    {
      title: CategoryParam.Photo,
      name: CategoryName.Photo,
      id: 11
    },
    {
      title: CategoryParam.Video,
      name: CategoryName.Video,
      id: 12
    },
  ];

function FilterCategory(): JSX.Element {
  const dispatch = useAppDispatch();
  const checkedList = useAppSelector(getFilterCategoryList);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  useEffect(() => {
    const catParams = params.cat?.split('-') as TCameraCategory[] || [];
    dispatch(setFilterCategoryList(catParams));
  }, []);


  function handleFilterToggle(title: TCameraCategory) {
    const currentIndex = checkedList.indexOf(title);

    const updatedCheckedList = [...checkedList];
    if (currentIndex === -1) {
      updatedCheckedList.push(title);
    } else {
      updatedCheckedList.splice(currentIndex, 1);
    }
    dispatch(setFilterCategoryList(updatedCheckedList));

    if (updatedCheckedList.length !== 0) {
      params.cat = updatedCheckedList.join('-');
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
              checked={checkedList.includes(it.title)}
              disabled={(params.cat !== it.title) && ('cat' in params)}
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
