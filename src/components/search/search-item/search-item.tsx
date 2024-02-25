import './search-item.css';
import { Link } from 'react-router-dom';
import { TCard } from '../../../types/general-types';
import { AppRoute } from '../../../consts';

type TSearchItemProps = {
  item: TCard;
}
function SearchItem({ item }: TSearchItemProps): JSX.Element {
  return (
    <Link
      to={`${AppRoute.Product}/${item.id}`}
    >
      <li className="form-search__select-item" tabIndex={0}>{item.name}</li>
    </Link>

  );
}

export { SearchItem };
