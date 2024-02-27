import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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

function useEnter() {
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  function handleKeydown(event: KeyboardEvent) {
    if (event.key.startsWith('Enter')) {
      event.preventDefault();
      setIsEnterPressed(true);
    }
  }


  function handleKeyup(event: KeyboardEvent) {
    if (event.key.startsWith('Enter')) {
      event.preventDefault();
      setIsEnterPressed(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, []);

  return isEnterPressed;
}


export {
  formatSearch,

  activateDownKey,
  activateUpKey,
  activateTabKey,
  useEnter,
};
