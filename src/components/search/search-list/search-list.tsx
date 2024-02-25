import { useEffect, useRef } from 'react';
import { TCard } from '../../../types/general-types';
import { SearchItem } from '../search-item/search-item';

type TSearchListProps = {
  list: TCard[];
  onSearchListClick: (value: string) => void;
}
function SearchList({ list, onSearchListClick }: TSearchListProps): JSX.Element {
  const searchListRef = useRef<HTMLUListElement>(null);
  const closeSearchList = onSearchListClick;


  function handleOutsideClick(event: MouseEvent) {
    event.preventDefault();
    const element = searchListRef.current;
    if (element && !element.contains(event.target as Element)) {
      closeSearchList('');
    }

  }
  useEffect(() => {
    let isMounted = true;
    const element = searchListRef.current;

    if (isMounted && element) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      isMounted = false;
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  return (
    <ul
      className="form-search__select-list"
      ref={searchListRef}
    >
      {list.map((item) => (
        <SearchItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export { SearchList };
