import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import styles from './string.module.css';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Circle } from '../ui/circle/circle';

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState('');

const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  setInput(e.target.value)
}


  return (
    <SolutionLayout title='Строка'>
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            maxLength={11}
            onChange={onChange}
            value={input}
            name={'text'}
          />
          <p className={styles.p}>Максимум — 11 символов</p>
        </div>
        <Button text='Развернуть' />
      </div>

      {/* <Circle letter={input}/> */}
    </SolutionLayout>
  );
};
