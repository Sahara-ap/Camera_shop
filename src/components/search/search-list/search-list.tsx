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
