import React, { useEffect, useState } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting-page.module.css';
import {
  bubbleSortAscending,
  bubbleSortDescending,
  randomArr,
  selectionSortAscending,
  selectionSortDescending,
} from './utils';

export const SortingPage: React.FC = () => {

  const [radioChoice, setRadioChoice] = useState(true);
  const [radioBubble, setRadioBubble] = useState(false);
  const [blocks, setBlocks] = useState<number[]>([]);
  const [compare, setCompare] = useState<number[]>([]);
  const [swap, setSwap] = useState<number[]>([]);
  const [sortedIndex, setSortedIndex] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(true);
  const [isLoaderAscending, setIsLoaderAscending] = useState(false);
  const [isLoaderDescending, setIsLoaderDescending] = useState(false);
  const [disabledAscending, setDisabledAscending] = useState(false)
  const [disabledDescending, setDisabledADescending] = useState(false)


  useEffect(() => {
    createArr();
  }, [randomArr]);

  const selectRadioChoice = () => {
    setRadioChoice(true);
    setRadioBubble(false);
  };

  const selectradioBubble = () => {
    setRadioBubble(true);
    setRadioChoice(false);
  };

  const createArr = () => {
    const randomArray = randomArr(17, 3, 100);
    setBlocks(randomArray);
    setSortedIndex([]);
    setCompleted(false);
  };

  const handleSort = (type: string) => {
    const sortAccOrder = (order: string | any[]) => {
      (function loop(i) {
        setTimeout(function () {
          const [j, k, arr, index] = order[i];
          setCompare([j, k]);
          setSwap([]);

          if (index !== null) {
            setSortedIndex((prevState) => [...prevState, index]);
          }

          if (arr) {
            setBlocks(arr);
            if (j !== null || k != null) setSwap([j, k]);
          }

          if (++i < order.length) {
            loop(i);
          } else {
            setSorting(false);
            setCompleted(true);
            setIsLoaderAscending(false);
            setIsLoaderDescending(false);
            setDisabledAscending(false)
            setDisabledADescending(false) 
            
          }
        }, SHORT_DELAY_IN_MS);
      })(0);

    };
      setSorting(true)
      setSortedIndex([]);

    if (type === 'ascending' && radioChoice) {
      sortAccOrder(selectionSortAscending(blocks));
      setIsLoaderAscending(true) 
      setDisabledADescending(true) 
    } else if (type === 'ascending' && radioBubble) {
      sortAccOrder(bubbleSortAscending(blocks));
      setIsLoaderAscending(true) 
      setDisabledADescending(true)  
    } else if (type === 'descending' && radioChoice) {
      sortAccOrder(selectionSortDescending(blocks));
      setIsLoaderDescending(true)
      setDisabledAscending(true)
    } else {
      sortAccOrder(bubbleSortDescending(blocks));
      setIsLoaderDescending(true)
      setDisabledAscending(true)
    }

  };


  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.container}>
        <RadioInput
          label={'Выбор'}
          extraClass={styles.radioChoice}
          name='sort'
          onChange={selectRadioChoice}
          defaultChecked
          disabled={sorting}
        />
        <RadioInput
          label={'Пузырёк'}
          extraClass={styles.radioBubble}
          name='sort'
          onChange={selectradioBubble}
          disabled={sorting}
        />
        <Button
          text='По возрастанию'
          sorting={Direction.Ascending}
          extraClass={styles.ascending}
          onClick={() => handleSort('ascending')}
          isLoader={isLoaderAscending}
          disabled={disabledAscending}
        />
        <Button
          text='По убыванию'
          sorting={Direction.Descending}
          extraClass={styles.descending}
          onClick={() => handleSort('descending')}
          isLoader={isLoaderDescending}
          disabled={disabledDescending}
        />
        <Button
          text='Новый массив'
          onClick={() => createArr()}
          disabled={sorting}
        />
      </div>
      <ul className={styles.ul}>
        {blocks.map((el, i) => {
          let bg;
          if (compare && (i === compare[0] || i === compare[1])) {
            bg = ElementStates.Changing;
          }

          if (swap && (i === swap[0] || i === swap[1])) {
            bg = ElementStates.Changing;
          }

          if (sortedIndex && sortedIndex.includes(i)) {
            bg = ElementStates.Modified;
          }
          return (
            <li className={styles.li} key={i}>
              <Column index={el} state={bg} extraClass={styles.column} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
