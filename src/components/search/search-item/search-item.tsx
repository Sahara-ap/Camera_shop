import { TCard } from '../../../types/general-types';

type TSearchItemProps = {
  item: TCard;
}
function SearchItem({item}: TSearchItemProps): JSX.Element {
  return (
    <li className="form-search__select-item" tabIndex={0}>{item.name}</li>
  );
}

export { SearchItem };
