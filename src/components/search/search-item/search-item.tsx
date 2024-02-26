import './search-item.css';
import { Link } from 'react-router-dom';
import { TCard } from '../../../types/general-types';
import { AppRoute } from '../../../consts';
import { useRef } from 'react';

type TSearchItemProps = {
  item: TCard;
  isSelected: boolean;
}
function SearchItem({ item, isSelected }: TSearchItemProps): JSX.Element {
  const liRef = useRef<HTMLLIElement>(null);
  if (isSelected && liRef.current) {
    liRef.current.focus();
  }
  console.log(isSelected, item.name, document.activeElement);


  return (
    <Link
      to={`${AppRoute.Product}/${item.id}`}
    >
      <li
        ref={liRef}
        className="form-search__select-item"
        tabIndex={isSelected ? 0 : -1}
      >
        {item.name}
      </li>
    </Link>

  );
}

export { SearchItem };
