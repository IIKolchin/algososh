import React, { ChangeEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { IStack, Stack } from './utils';
import { Circle } from '../ui/circle/circle';

export const StackPage: React.FC = () => {

  const stack = new Stack();

  const [input, setInput] = useState('');
  const [arr, setArr] = useState<number[]>([])


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

// console.log(st)
console.log(stack)


const addStack = () => {
  stack.push(input)
  const tail = stack.peak()
  console.log(tail)
  arr.push(tail as number)
  setArr([...arr])
}
console.log(stack.peak())

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
        />
        <Button
          text='Удалить'
          extraClass={styles.delete}
          // onClick={}
        />
        <Button
          text='Очистить'
          extraClass={styles.clear}
          // onClick={}
        />
      </div>
      <ul className={styles.str}>
        {arr.map((el, index) => {
          return (
            <li key={index} className={styles.circle}>
              <Circle
                // state={changeColor(firstIndex!, secondIndex!, index)}
                letter={String(el)}
                head={String(el)}
                index={index}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
