import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TParamsCatalog } from '../../../types/generalTypes';
import { getParams } from '../../../utils/utils-functions';

const CATEGORIES = [
  {
    title: 'Фотокамера',
    name: 'photocamera',
    id: 11
  },
  {
    title: 'Видеокамера',
    name: 'videocamera',
    id: 12
  },
];

function FilterCategory(): JSX.Element {

  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({cat: 'video'});
  const currentCategoryParam = searchParams.get('cat');
  // console.log('cat', currentCategoryParam)
  // console.log('checkedList', checkedList);
  const params = getParams(searchParams);
  console.log('searchParams', getParams(searchParams));
  const [currentParams, setCurrentParams] = useState(params);

  function handleFilterToggle(filterId: number) {
    // console.log('filterId', filterId);

    const updateCheckedList = [...checkedList];

    const currentIndex = checkedList.indexOf(filterId);
    if (currentIndex === -1) {
      updateCheckedList.push(filterId);
    } else {
      updateCheckedList.splice(currentIndex, 1);
    }

    setCheckedList(updateCheckedList);
    setCurrentParams({
      ...currentParams,
      cat: filterId,
    });
    setSearchParams({
      ...params,
      cat: String(filterId)});
    // console.log('click');
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
              onChange={() => handleFilterToggle(it.id)}
              checked={checkedList.includes(it.id)}
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
