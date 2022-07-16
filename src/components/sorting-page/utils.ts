import { swap } from '../../utils/utils';

export const bubbleSortAscending = (arr: number[]) => {
  const dupBlocks = arr.slice();
  const order = [];

  let j;

  for (let i = 0; i < dupBlocks.length; i++) {
    for (j = 0; j < dupBlocks.length - i - 1; j++) {
      order.push([j, j + 1, null, null]);
      if (dupBlocks[j] > dupBlocks[j + 1]) {
        swap(dupBlocks, j, j + 1);
        order.push([j, j + 1, dupBlocks.slice(), null]);
      }
    }
    order.push([null, null, null, j]);
  }

  return order;
};

export const bubbleSortDescending = (arr: number[]) => {
  const dupBlocks = arr.slice();
  const order = [];

  let j;

  for (let i = 0; i < dupBlocks.length; i++) {
    for (j = 0; j < dupBlocks.length - i - 1; j++) {
      order.push([j, j + 1, null, null]);
      if (dupBlocks[j] < dupBlocks[j + 1]) {
        swap(dupBlocks, j, j + 1);
        order.push([j, j + 1, dupBlocks.slice(), null]);
      }
    }
    order.push([null, null, null, j]);
  }

  return order;
};

export const selectionSortAscending = (arr: number[]) => {
  const dupBlocks = arr.slice();
  const order = [];

  for (let i = 0; i < dupBlocks.length; i++) {
    for (let j = i + 1; j < dupBlocks.length; j++) {
      order.push([i, j, null, null]);
      if (dupBlocks[i] > dupBlocks[j]) {
        swap(dupBlocks, i, j);
        order.push([i, j, dupBlocks.slice(), null]);
      }
    }
    order.push([null, null, null, i]);
  }

  return order;
};

export const selectionSortDescending = (arr: number[]) => {
  const dupBlocks = arr.slice();
  const order = [];

  for (let i = 0; i < dupBlocks.length; i++) {
    for (let j = i + 1; j < dupBlocks.length; j++) {
      order.push([i, j, null, null]);
      if (dupBlocks[i] < dupBlocks[j]) {
        swap(dupBlocks, i, j);
        order.push([i, j, dupBlocks.slice(), null]);
      }
    }
    order.push([null, null, null, i]);
  }

  return order;
};

export const randomArr = (
  maxLength: number,
  minLength: number,
  maxValue: number
) => {
  let length =
    Math.floor(Math.random() * (maxLength + 1 - minLength)) + minLength;
  if (length >= 3 && length <= 17) {
    return Array.apply(null, Array(length)).map(function () {
      return Math.round(Math.random() * maxValue);
    });
  }
  return Array;
};
