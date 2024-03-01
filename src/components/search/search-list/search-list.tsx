import { TCard } from '../../../types/general-types';
import { SearchItem } from '../search-item/search-item';

type TSearchListProps = {
  list: TCard[];
  searchLineIndex: number;
}
function SearchList({ list, searchLineIndex }: TSearchListProps): JSX.Element {

  return (
    <ul
      className="form-search__select-list"
      data-testid="searchListUl"

    >
      {list.map((item, index) => (
        <SearchItem key={item.id} item={item} isSelected={index === searchLineIndex} />
      ))}
    </ul>
  );
}

export { SearchList };
