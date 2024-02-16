import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '../../../utils/utils-functions';
import { CategoryName } from '../../../consts';

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


const CATEGORIES = [
  {
    title: 'Фотокамера',
    name: CategoryName.Photo,
    id: 11
  },
  {
    title: 'Видеокамера',
    name: CategoryName.Video,
    id: 12
  },
];


const categoryMap = {
  [CategoryName.Video]: 'Видеокамера',
  [CategoryName.Photo]: 'Фотоаппарат',
};

function FilterCategory(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const catParams = params.cat?.split('-') as CategoryName[] || [];

  const [checkedList, setCheckedList] = useState<CategoryName[]>(catParams); //стейт для union входящих фильтров


  checkedList.forEach((shortcut) => {
    const value = categoryMap[shortcut] || '';
    console.log(value);
  });


  function handleFilterToggle(name: CategoryName) {
    const currentIndex = checkedList.indexOf(name);

    const updatedCheckedList = [...checkedList];
    if (currentIndex === -1) {
      updatedCheckedList.push(name);
    } else {
      updatedCheckedList.splice(currentIndex, 1);
    }
    setCheckedList(updatedCheckedList);

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
              onChange={() => handleFilterToggle(it.name)}
              checked={checkedList.includes(it.name)}
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
