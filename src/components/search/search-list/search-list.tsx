import { TCard } from '../../../types/general-types';
import { SearchItem } from '../search-item/search-item';

type TSearchListProps = {
  list: TCard[];
  searchLineIndex: number;
}
function SearchList({ list, searchLineIndex }: TSearchListProps): JSX.Element {
  const isEmptyList = list.length === 0;


  return (
    <ul
      className="form-search__select-list"
      data-testid="searchListUl"
      style={isEmptyList ? {overflow: 'hidden', color: 'grey'} : {}}

    >
      {isEmptyList ? <li className="form-search__select-item">no matches</li> : list.map((item, index) => (
        <SearchItem key={item.id} item={item} isSelected={index === searchLineIndex} />
      ))}
    </ul>
  );
}

export { SearchList };
