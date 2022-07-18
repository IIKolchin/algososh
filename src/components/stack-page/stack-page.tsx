import React, { ChangeEvent, useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Stack } from './utils';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

type Tarr = {
  value?: number;
  head?: string;
  color?: ElementStates;
};

export const StackPage: React.FC = () => {
  const stack = new Stack();
  const [input, setInput] = useState('');
  const [arr, setArr] = useState<Tarr[]>([]);
  const [isDisabledAdd, setIsDisabledAdd] = useState(true);
  const [isDisabledDel, setIsDisabledDel] = useState(true);
  const [isDisabledClear, setIsDisabledClear] = useState(true);
  const [isLoaderAdd, setIsLoaderAdd] = useState(false);
  const [isLoaderDel, setIsLoaderDel] = useState(false);
  const [isLoaderClear, setIsLoaderClear] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsDisabledAdd(false);
  };

  useEffect(() => {
    if (arr.length !== 0) {
      setIsDisabledDel(false);
      setIsDisabledClear(false);
    }
  }, [arr]);

  const addStack = async () => {
    setIsLoaderAdd(true);
    stack.push(input);
    arr.forEach((el) => (el.head = ''));
    arr.push({ value: stack.peak() as number, head: '' });
    arr[arr.length - 1].color = ElementStates.Changing;
    arr[arr.length - 1].head = 'top';
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr[arr.length - 1].color = ElementStates.Default;
    setInput('');
    setIsDisabledAdd(true);
    setIsLoaderAdd(false);
  };

  const deleteStack = async () => {
    setIsLoaderDel(true);
    stack.pop();
    arr.pop();
    if (arr.length > 0) {
      arr[arr.length - 1].color = ElementStates.Changing;
      arr[arr.length - 1].head = 'top';
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      arr[arr.length - 1].color = ElementStates.Default;
    }
    setArr([...arr]);

    if (arr.length === 0) {
      setIsDisabledDel(true);
      setIsDisabledClear(true);
    }
    setIsDisabledAdd(true);
    setIsLoaderDel(false);
  };

  const clearStack = () => {
    setIsLoaderClear(true);
    stack.clear();
    arr.length = 0;
    setArr([...arr]);
    setIsDisabledDel(true);
    setIsDisabledClear(true);
    setIsDisabledAdd(true);
    setIsLoaderClear(false);
  };

  return (
    <SolutionLayout title='Стек'>
      <div className={styles.container}>
        <Input
          maxLength={4}
          extraClass={styles.inputs}
          onChange={onChange}
          value={input}
          name={'text'}
          isLimitText
        />
        <Button
          text='Добавить'
          extraClass={styles.add}
          onClick={addStack}
          disabled={isDisabledAdd}
          isLoader={isLoaderAdd}
        />
        <Button
          text='Удалить'
          extraClass={styles.delete}
          onClick={deleteStack}
          disabled={isDisabledDel}
          isLoader={isLoaderDel}
        />
        <Button
          text='Очистить'
          extraClass={styles.clear}
          onClick={clearStack}
          disabled={isDisabledClear}
          isLoader={isLoaderClear}
        />
      </div>
      <ul className={styles.str}>
        {arr.map((el, index) => {
          return (
            <li key={index} className={styles.circle}>
              <Circle
                // state={el.color}
                // letter={String(el.value)}
                // head={String(el.head)}
                index={index}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
