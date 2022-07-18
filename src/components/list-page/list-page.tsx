import React from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list-page.module.css';

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.grid}>
        <Input extraClass={styles.value} maxLength={4} isLimitText />
        <Button extraClass={styles.addHead} text='Добавить в head'/>
        <Button extraClass={styles.addTail} text='Добавить в tail'/>
        <Button extraClass={styles.delHead} text='Удалить из head'/>
        <Button extraClass={styles.delTail} text='Удалить из tail'/>
        <Input extraClass={styles.index} />
        <Button extraClass={styles.addIndex} text='Добавить по индексу'/>
        <Button extraClass={styles.delIndex} text='Удалить по индексу'/>
      </div>
    </SolutionLayout>
  );
};
