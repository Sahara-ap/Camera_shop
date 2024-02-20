import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getLevelFilterList } from '../../../store/app-data-store/app-data-selectors';
import { getParams } from '../../../utils/utils-functions';
import { useEffect } from 'react';
import { setLevelFilterList } from '../../../store/app-data-store/app-data-slice';
import { TCameraLevel } from '../../../types/general-types';

enum LevelParam {
  zero = 'Нулевой',
  nonProfessional = 'Любительский',
  professional = 'Профессиональный',
}

const LEVELS: {
  title: LevelParam;
  name: 'zero' | 'non-professional' | 'professional';
  id: number;
}[] =
  [
    {
      title: LevelParam.zero,
      name: 'zero',
      id: 31
    },
    {
      title: LevelParam.nonProfessional,
      name: 'non-professional',
      id: 32
    },
    {
      title: LevelParam.professional,
      name: 'professional',
      id: 33
    },
  ];

function FilterLevel(): JSX.Element {
  const dispatch = useAppDispatch();
  const levelFilterList = useAppSelector(getLevelFilterList);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  useEffect(() => {
    const levelParams = params.level?.split('-') as TCameraLevel[] || [];
    dispatch(setLevelFilterList(levelParams));
  }, []);

  function handleFilterToggle(title: TCameraLevel) {
    const updatedCheckedList = [...levelFilterList];

    const currentIndex = updatedCheckedList.indexOf(title);
    if (currentIndex === -1) {
      updatedCheckedList.push(title);
    } else {
      updatedCheckedList.splice(currentIndex, 1);
    }
    dispatch(setLevelFilterList(updatedCheckedList));

    if (updatedCheckedList.length !== 0) {
      params.level = updatedCheckedList.join('-');
    } else {
      delete params.level;
    }
    setSearchParams(params);
  }

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {LEVELS.map((level) => (
        <div key={level.id} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name={level.name}
              onChange={() => handleFilterToggle(level.title)}
              checked={levelFilterList.includes(level.title)}
            />
            <span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{level.title}</span>
          </label>
        </div>
      ))}

    </fieldset>
  );
}

export { FilterLevel };
