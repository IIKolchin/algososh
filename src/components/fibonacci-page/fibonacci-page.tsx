import React, { ChangeEvent, SetStateAction, useState } from 'react';
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { getFibonacciNumbers } from './utils';

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [numberArr, setNumberArr] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if(Number(e.target.value) > 19) {
      setInput('19');
    }
  };

  const fibonacciRender = async (n: number) => {
    const arrFib = getFibonacciNumbers(n);
    const arrRender: any = [];
    while (arrFib.length !== 0) {
      setIsLoader(true);
      setIsDisabled(true);
      await delay(SHORT_DELAY_IN_MS);
      arrRender.push(arrFib.shift());
      setNumberArr([...arrRender]);
    }
    setIsLoader(false);
    setIsDisabled(false);
  };

  const style = numberArr.length > 9 ? {justifyContent: 'start'} : {justifyContent: 'center'}

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={styles.container}>
        <Input
          max={19}
          extraClass={styles.inputs}
          onChange={onChange}
          value={input}
          name={'text'}
          type='number'
          isLimitText
          disabled={isDisabled}
        />
        <Button
          text='Раcсчитать'
          onClick={() => fibonacciRender(Number(input))}
          isLoader={isLoader}
        />
      </div>
      <ul className={styles.str} style={style}>
        {numberArr.map((el, index) => {
          return (
            <li key={index} className={styles.circle}>
              <Circle letter={String(el)} index={index} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
