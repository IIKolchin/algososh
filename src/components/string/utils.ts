import { SetStateAction } from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { delay, swap } from '../../utils/utils';

export const changeColor = (start: number, end: number, index: number) => {
  if (start === index || end === index) {
    return ElementStates.Changing;
  } else if (start >= index || end <= index) {
    return ElementStates.Modified;
  }
};

export const reverseString = async (
  str: string,
  setWordArr: (arg0: string[]) => void,
  setIsLoader: (arg0: boolean) => void,
  setIsDisabled: (arg0: boolean) => void,
  setFirstIndex: (arg0: number) => void,
  setSecondIndex: (arg0: number) => void
) => {
  const wordArray = str.split('');
  setWordArr(wordArray);

  let start = 0;
  let end = wordArray.length - 1;
  while (start <= end) {
    setIsLoader(true);
    setIsDisabled(true);
    setFirstIndex(start);
    setSecondIndex(end);
    await delay(DELAY_IN_MS);
    swap(wordArray, start, end);
    setWordArr([...wordArray]);

    await delay(DELAY_IN_MS);
    start++;
    end--;
  }
  setFirstIndex(100);
  setSecondIndex(100);
  setIsLoader(false);
  setIsDisabled(false);

  return wordArray.join('');
};
