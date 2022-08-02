import React, { ChangeEvent, useState } from 'react';
import styles from './string.module.css';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Circle } from '../ui/circle/circle';
import { changeColor, reverseString } from './utils';

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
          onClick={() =>
            reverseString(
              input,
              setWordArr,
              setIsLoader,
              setIsDisabled,
              setFirstIndex,
              setSecondIndex
            )
          }
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
