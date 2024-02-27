import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TCard } from '../../../types/general-types';

function formatSearch(searchValue: string) {
  const result = searchValue.toLowerCase().replace(/\s+/g, '');
  return result;
}

type TSetSearchLineIndex = Dispatch<SetStateAction<number>>
function activateDownKey(event: React.KeyboardEvent, lastIndexInUl: number, cb: TSetSearchLineIndex) {
  const isDownKey = event.key.startsWith('ArrowDown');

  if (isDownKey) {
    event.preventDefault();
    cb((prev) => prev < lastIndexInUl ? (prev + 1) : prev);
  }
}

function activateUpKey(event: React.KeyboardEvent, cb: TSetSearchLineIndex) {
  const isUpKey = event.key.startsWith('ArrowUp');

  if (isUpKey) {
    event.preventDefault();
    cb((prev) => prev > 0 ? prev - 1 : prev);
  }
}

function activateTabKey(event: React.KeyboardEvent, lastIndexInUl: number, cb: TSetSearchLineIndex) {
  const isTabKey = event.key.startsWith('Tab');

  if (isTabKey) {
    event.preventDefault();
    cb((prev) => prev < lastIndexInUl ? (prev + 1) : prev);
  }
}

function filterBySearch(cameras: TCard[], searchValue: string) {
  const result = cameras.filter((item) => {
    const formatName = formatSearch(item.name);
    const formatSearchValue = formatSearch(searchValue);
    return formatName.includes(formatSearchValue);
  });
  return result;
}


export {
  formatSearch,

  activateDownKey,
  activateUpKey,
  activateTabKey,

  filterBySearch

};
