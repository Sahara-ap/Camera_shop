import { TCard } from '../../../types/general-types';
import { SearchItem } from '../search-item/search-item';

type TSearchListProps = {
  list: TCard[];
}
function SearchList({ list }: TSearchListProps): JSX.Element {

  return (
    <ul className="form-search__select-list">
      {list.map((item) => (
        <SearchItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export { SearchList };

// <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 7i</li>
// <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 6i</li>
// <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 5i</li>
// <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 4i</li>
