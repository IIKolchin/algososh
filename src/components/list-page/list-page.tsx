import React, { useEffect, useState } from 'react';
import styles from './list-page.module.css';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Input } from '../ui/input/input';
import { delay, randomArr } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ILinkedList, LinkedList } from './linked-list';

type TArrProps = {
  value?: string;
  head?: string;
  notArrow?: boolean;
  tail?: string;
  adding?: boolean;
  deleting?: boolean;
  color: ElementStates;
  extraCircle?: {
    value: string;
  };
};
export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>();
  const [arr, setArr] = useState<TArrProps[]>([]);
  const [linkedList, setLinkedList] = useState<ILinkedList<string>>();
  const [addingByIdx, setAddingByIdx] = useState(false);
  const [deletingByIdx, setDeletingByIdx] = useState(false);
  const [deletingFromHead, setDeletingFromHead] = useState(false);
  const [deletingFromTail, setDeletingFromTail] = useState(false);
  const [addingToHead, setAddingToHead] = useState(false);
  const [addingToTail, setAddingToTail] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const linkedListArr = [...arr];

  useEffect(() => {
    createArr();
    setArr(arr);
  }, []);

  const createArr = () => {
    const arrayCopy = [...(randomArr(4, 6, 100) as number[])];
    const array = arrayCopy.map(String);
    array.forEach((el) => {
      arr.push({
        value: el,
        color: ElementStates.Default,
      });
    });
    const linkedListNew = new LinkedList<string>(array);
    setLinkedList(linkedListNew);
  };

  const sortWithDelay = async (arr: TArrProps[]) => {
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const addToHead = async () => {
    setInputValue('');
    setInProgress(true);
    setAddingToHead(true);

    linkedList!.addByIndex(inputValue, 0);

    const head = linkedList!.getNodeByIndex(0);

    linkedListArr[0] = {
      ...linkedListArr[0],
      adding: true,
      extraCircle: {
        value: head ? head : '',
      },
    };
    await sortWithDelay([...linkedListArr]);

    linkedListArr[0] = {
      ...linkedListArr[0],
      adding: false,
      extraCircle: undefined,
    };
    linkedListArr.unshift({
      value: head ? head : '',
      color: ElementStates.Modified,
    });
    await sortWithDelay([...linkedListArr]);

    linkedListArr[0].color = ElementStates.Default;
    setInProgress(false);
    setAddingToHead(false);
  };

  const addToTail = async () => {
    setInputValue('');
    setInProgress(true);
    setAddingToTail(true);

    linkedList!.append(inputValue);

    const tailIndex = linkedList!.getSize() - 1;

    const tail = linkedList!.getNodeByIndex(tailIndex);

    for (let i = 0; i <= tailIndex; i++) {
      linkedListArr[i] = {
        ...linkedListArr[i],
        adding: true,
        extraCircle: {
          value: tail ? tail : '',
        },
      };
      if (i > 0) {
        linkedListArr[i - 1] = {
          ...linkedListArr[i - 1],
          adding: false,
          extraCircle: undefined,
          color: ElementStates.Changing,
        };
      }
      await sortWithDelay([...linkedListArr]);
    }

    linkedListArr[linkedListArr.length - 1] = {
      ...linkedListArr[linkedListArr.length],
      value: tail ? tail : '',
      color: ElementStates.Modified,
      extraCircle: undefined,
      adding: false,
    };
    await sortWithDelay([...linkedListArr]);

    linkedListArr.forEach((el) => (el.color = ElementStates.Default));
    await sortWithDelay([...linkedListArr]);
    setInProgress(false);
    setAddingToTail(false);
  };

  const deleteFromHead = async () => {
    setInProgress(true);
    setDeletingFromHead(true);
    linkedList!.print();

    const deletedElement = linkedList!.deleteByIndex(0);

    linkedListArr[0] = {
      ...linkedListArr[0],
      value: '',
      deleting: true,
      extraCircle: {
        value: deletedElement ? deletedElement : '',
      },
    };
    await sortWithDelay([...linkedListArr]);

    linkedListArr.shift();
    linkedListArr[0].color = ElementStates.Modified;
    await sortWithDelay([...linkedListArr]);

    linkedListArr[0].color = ElementStates.Default;
    setInProgress(false);
    setDeletingFromHead(false);
  };

  const deleteFromTail = async () => {
    setInProgress(true);
    setDeletingFromTail(true);

    linkedList!.print();

    const tailIdx = linkedList!.getSize() - 1;

    const deletedElement = linkedList!.deleteByIndex(tailIdx);
    linkedList!.print();

    linkedListArr[linkedListArr.length - 1] = {
      ...linkedListArr[linkedListArr.length - 1],
      value: '',
      deleting: true,
      extraCircle: {
        value: deletedElement ? deletedElement : '',
      },
    };
    await sortWithDelay([...linkedListArr]);

    linkedListArr.pop();
    linkedListArr[linkedListArr.length - 2].color = ElementStates.Modified;
    await sortWithDelay([...linkedListArr]);

    linkedListArr[linkedListArr.length - 2].color = ElementStates.Default;
    setInProgress(false);
    setDeletingFromTail(false);
  };

  const addByIndex = async (index: number) => {
    setInProgress(true);
    setAddingByIdx(true);
    setInputValue('');
    linkedList!.print();

    linkedList!.addByIndex(inputValue, index);

    const newValue = linkedList!.getNodeByIndex(index);
    linkedList!.print();

    for (let i = 0; i <= index!; i++) {
      linkedListArr[i] = {
        ...linkedListArr[i],
        adding: true,
        extraCircle: {
          value: newValue ? newValue : '',
        },
      };
      if (i > 0)
        linkedListArr[i - 1] = {
          ...linkedListArr[i - 1],
          adding: false,
          extraCircle: undefined,
          color: ElementStates.Changing,
        };
      await sortWithDelay([...linkedListArr]);
    }

    linkedListArr[index!] = {
      ...linkedListArr[index!],
      adding: false,
      extraCircle: undefined,
    };
    linkedListArr.splice(index!, 0, {
      value: newValue ? newValue : '',
      color: ElementStates.Modified,
    });
    await sortWithDelay([...linkedListArr]);

    linkedListArr.forEach((el) => (el.color = ElementStates.Default));
    setInputIndex(undefined);
    setInProgress(false);
    setAddingByIdx(false);
  };

  const delByIndex = async (index: number) => {
    setDeletingByIdx(true);
    setInProgress(true);

    linkedList!.print();

    const deletedElement = linkedList!.deleteByIndex(index);
    linkedList!.print();

    for (let i = 0; i <= index!; i++) {
      linkedListArr[i].color = ElementStates.Changing;
      if (i === index) linkedListArr[i].notArrow = true;
      await sortWithDelay([...linkedListArr]);
    }

    linkedListArr[index!] = {
      ...linkedListArr[index!],
      value: '',
      deleting: true,
      extraCircle: {
        value: deletedElement ? deletedElement : '',
      },
    };
    await sortWithDelay([...linkedListArr]);

    linkedListArr.splice(index!, 1);

    linkedListArr.forEach((el) => (el.color = ElementStates.Default));
    setInputIndex(undefined);
    setInProgress(false);
    setDeletingByIdx(false);

    await sortWithDelay([...linkedListArr]);
  };

  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.grid}>
        <Input
          extraClass={styles.input}
          placeholder='Введите значение'
          min={1}
          value={inputValue || ''}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          isLimitText
          maxLength={4}
        />
        <Button
          extraClass={styles.addHead}
          text='Добавить в head'
          type='button'
          onClick={() => addToHead()}
          disabled={inProgress || !inputValue || arr.length > 8}
          isLoader={addingToHead}
        />
        <Button
          extraClass={styles.addTail}
          text='Добавить в tail'
          type='button'
          onClick={() => addToTail()}
          isLoader={addingToTail}
          disabled={inProgress || !inputValue || arr.length > 8}
        />
        <Button
          extraClass={styles.delHead}
          text='Удалить из head'
          type='button'
          onClick={() => deleteFromHead()}
          disabled={inProgress || arr.length <= 1}
          isLoader={deletingFromHead}
        />
        <Button
          extraClass={styles.delTail}
          text='Удалить из tail'
          type='button'
          onClick={() => deleteFromTail()}
          disabled={inProgress || arr.length <= 1}
          isLoader={deletingFromTail}
        />

        <Input
          type='text'
          extraClass={styles.input}
          placeholder='Введите индекс'
          maxLength={1}
          value={inputIndex || ''}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputIndex(Number(e.currentTarget.value.replace(/[^0-9]/g, '')))
          }
        />
        <Button
          extraClass={styles.addIndex}
          disabled={
            inProgress ||
            !inputIndex ||
            !inputValue ||
            inputIndex > arr.length - 1 ||
            arr.length > 8
          }
          isLoader={addingByIdx}
          text='Добавить по индексу'
          type='button'
          onClick={() => inputIndex && addByIndex(inputIndex)}
        />
        <Button
          extraClass={styles.delIndex}
          isLoader={deletingByIdx}
          disabled={!inputIndex || inProgress || inputIndex > arr.length - 1}
          text='Удалить по индексу'
          type='button'
          onClick={() => inputIndex && delByIndex(inputIndex)}
        />
      </div>
      <ul className={styles.str}>
        {arr.map((el, i) => {
          return (
            <li className={styles.li} key={i}>
              <Circle
                state={el.color}
                letter={el.value}
                index={i}
                head={i === 0 && !el.adding && !el.deleting ? 'head' : ''}
                tail={
                  i === arr.length - 1 && !el.adding && !el.deleting
                    ? 'tail'
                    : ''
                }
              />
              {i !== arr.length - 1 && (
                <ArrowIcon
                  fill={
                    el.color === ElementStates.Changing && !el.notArrow
                      ? '#d252e1'
                      : '#0032FF'
                  }
                />
              )}
              {el.adding && (
                <Circle
                  extraClass={styles.topCircle}
                  state={ElementStates.Changing}
                  letter={el.extraCircle?.value}
                  isSmall
                />
              )}
              {el.deleting && (
                <Circle
                  extraClass={styles.lowCircle}
                  state={ElementStates.Changing}
                  letter={el.extraCircle?.value}
                  isSmall
                />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
