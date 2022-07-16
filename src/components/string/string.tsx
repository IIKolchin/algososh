import React, {
  ChangeEvent,
  FormEventHandler,
  SetStateAction,
  useState,
} from 'react';
import styles from './string.module.css';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { delay, swap } from '../../utils/utils';
import { DELAY_IN_MS } from '../../constants/delays';

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [wordArr, setWordArr] = useState<string[]>([]);
  const [firstIndex, setFirstIndex] = useState<number>();
  const [secondIndex, setSecondIndex] = useState<number>();
  const [isLoader, setIsLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const reverseWord = async (str: string) => {
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
  };

  const changeColor = (start: number, end: number, index: number) => {
    if (start === index || end === index) {
      return ElementStates.Changing;
    } else if (start >= index || end <= index) {
      return ElementStates.Modified;
    } else if (start === 1000 || end === 1000) {
      return ElementStates.Modified;
    }
  };
  
  return (
    <SolutionLayout title='Строка'>
      <div className={styles.container}>
        <Input
          maxLength={11}
          extraClass={styles.inputs}
          onChange={onChange}
          value={input}
          name={'text'}
          isLimitText
        />
        <Button
          text='Развернуть'
          onClick={() => reverseWord(input)}
          isLoader={isLoader}
        />
      </div>
      <ul className={styles.str}>
        {wordArr.map((el, index) => {
          return (
            <li key={index} className={styles.circle}>
              <Circle
                state={changeColor(firstIndex!, secondIndex!, index)}
                letter={el}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
