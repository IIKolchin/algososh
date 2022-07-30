import React, {
  ChangeEvent,
  useState,
} from 'react';
import styles from './string.module.css';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Circle } from '../ui/circle/circle';
import { delay, swap } from '../../utils/utils';
import { DELAY_IN_MS } from '../../constants/delays';
import { changeColor } from './utils';

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
          disabled={isDisabled}
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
