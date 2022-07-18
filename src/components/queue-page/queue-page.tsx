import React, { ChangeEvent, useEffect, useState } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils/utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css';
import { Queue } from './utils';

type Tarr = {
  value?: string;
  head?: string;
  tail?: string;
  color?: ElementStates;
};

export const QueuePage: React.FC = () => {
  const qLength = 7;
  const queue = new Queue<string>(qLength);
  const [q, setQ] = useState(queue);
  const [input, setInput] = useState('');
  const [arr, setArr] = useState<Tarr[]>([]);
  const [isDisabledAdd, setIsDisabledAdd] = useState(true);
  const [isDisabledDel, setIsDisabledDel] = useState(true);
  const [isDisabledClear, setIsDisabledClear] = useState(true);
  const [isLoaderAdd, setIsLoaderAdd] = useState(false);
  const [isLoaderDel, setIsLoaderDel] = useState(false);
  const [isLoaderClear, setIsLoaderClear] = useState(false);
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const arrQ = [...arr];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsDisabledAdd(false);
    if (q.getTailIndex() + 1 === qLength) {
      setIsDisabledAdd(true);
    }
  };

  const setEmptyArr = () => {
    setArr(
      Array.from(Array(qLength), () => ({
        value: '',
        head: '',
        tail: '',
      }))
    );
  };

  useEffect(() => {
    setEmptyArr();
  }, [setArr]);

  useEffect(() => {
    if (q.getLength() !== 0) {
      setIsDisabledDel(false);
      setIsDisabledClear(false);
    }
  }, [arr]);

  const addQueue = async () => {
    setInput('');
    setIsDisabledInput(true);
    setIsLoaderAdd(true);
    q.enqueue(input);

    if (q.getLength() < 2) {
      arrQ[q.getHeadIndex()].color = ElementStates.Changing;
    }
    arrQ[q.getHeadIndex()].head = 'head';
    if (q.getHeadIndex() > 0) {
      arrQ[q.getTailIndex() - 1].head = '';
    }
    arrQ[q.getHeadIndex()].value = q.getHead()!;
    arrQ[q.getHeadIndex()].color = ElementStates.Default;

    if (q.getTailIndex() > 0) {
      arrQ[q.getTailIndex() - 1].tail = '';
    }
    arrQ[q.getTailIndex()].color = ElementStates.Changing;
    arrQ[q.getTailIndex()].tail = 'tail';
    arrQ[q.getTailIndex()].value = q.getTail()!;
    setArr([...arrQ]);
    await delay(SHORT_DELAY_IN_MS);
    arrQ[q.getTailIndex()].color = ElementStates.Default;

    console.log(q);

    setIsDisabledAdd(true);
    setIsLoaderAdd(false);
    setIsDisabledInput(false);
  };

  const deleteQueue = async () => {
    setIsLoaderDel(true);

    if (q.getLength() === 0) {
      setIsDisabledDel(true);
      setIsDisabledClear(true);
    }
    q.dequeue();

    if (q.getHeadIndex() <= q.getTailIndex()) {
      arrQ[q.getHeadIndex() - 1].color = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);
      arrQ[q.getHeadIndex() - 1].head = '';
      arrQ[q.getHeadIndex() - 1].value = '';
      arrQ[q.getHeadIndex()].head = 'head';
      arrQ[q.getHeadIndex()].value = q.getHead()!;
      setArr([...arrQ]);
    }
    arrQ[q.getHeadIndex() - 1].color = ElementStates.Default;

    if (q.getHeadIndex() > q.getTailIndex()) {
      arrQ[q.getTailIndex()].value = '';
      arrQ[q.getTailIndex()].tail = '';
      arrQ[q.getHeadIndex() - 1].head = 'head';
      setArr([...arrQ]);
    }
    setIsDisabledAdd(true);
    setIsLoaderDel(false);
  };

  const clearQueue = () => {
    setIsLoaderClear(true);
    q.clear();
    setEmptyArr();
    setIsDisabledDel(true);
    setIsDisabledClear(true);
    setIsDisabledAdd(true);
    setIsLoaderClear(false);
  };

  return (
    <SolutionLayout title='Очередь'>
      <div className={styles.container}>
        <Input
          maxLength={4}
          extraClass={styles.inputs}
          onChange={onChange}
          value={input}
          name={'text'}
          isLimitText
          disabled={isDisabledInput}
        />
        <Button
          text='Добавить'
          extraClass={styles.add}
          onClick={addQueue}
          disabled={isDisabledAdd}
          isLoader={isLoaderAdd}
        />
        <Button
          text='Удалить'
          extraClass={styles.delete}
          onClick={deleteQueue}
          disabled={isDisabledDel || q.isEmpty()}
          isLoader={isLoaderDel}
        />
        <Button
          text='Очистить'
          extraClass={styles.clear}
          onClick={clearQueue}
          disabled={isDisabledClear}
          isLoader={isLoaderClear}
        />
      </div>
      <ul className={styles.str}>
        {arr.map((el, index) => {
          return (
            <li className={styles.circle} key={index}>
              <Circle
                state={el.color}
                letter={String(el.value)}
                head={String(el.head)}
                tail={String(el.tail)}
                index={index}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
