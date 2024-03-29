import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getLevelFilterList } from '../../../store/app-data-store/app-data-selectors';
import { getParams } from '../../../utils/utils-functions';
import { useEffect } from 'react';
import { setLevelFilterList } from '../../../store/app-data-store/app-data-slice';
import { TCameraLevel } from '../../../types/general-types';
import { updateCheckedList, updateFilterParam } from '../utils/filter-utils';

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
  }, [dispatch, params.level]);

  function handleFilterToggle(title: TCameraLevel) {
    const levelCheckedList = [...levelFilterList];

    updateCheckedList(levelCheckedList, title);

    updateFilterParam(params, 'level', levelCheckedList);
    setSearchParams(params);
  }


  return (
    <fieldset className="catalog-filter__block" data-testid="filterLevelElement">
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
