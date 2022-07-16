import { swap } from '../../utils/utils';

// export const bubbleSortAscending = (arr: number[]) => {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr.length - i - 1; j++) {
//       if (arr[j + 1] < arr[j]) {
//         swap(arr, j, j + 1);
//       }
//     }
//   }
//   return arr;
// };

// export const bubbleSortDescending = (arr: number[]) => {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr.length - i - 1; j++) {
//       if (arr[j + 1] > arr[j]) {
//         swap(arr, j, j + 1);
//       }
//     }
//   }
//   return arr;
// };

export const bubbleSortAscending = (arr: number[]) => {

    const dupBlocks = arr.slice() 
    const order = []

    let i, j
    
    for (i = 0; i < dupBlocks.length; i++) {
        for (j = 0; j < dupBlocks.length - i - 1; j++) {

            order.push([j, j + 1, null, null])                  
            if (dupBlocks[j] > dupBlocks[j + 1]) {
                swap(dupBlocks, j, j + 1)
                order.push([j, j + 1, dupBlocks.slice(), null]) 
            }
        }
        order.push([null, null, null, j]) 
    }

    return order
}

export const bubbleSortDescending = (arr: number[]) => {

    const dupBlocks = arr.slice() 
    const order = []

    let i, j
    
    for (i = 0; i < dupBlocks.length; i++) {
        for (j = 0; j < dupBlocks.length - i - 1; j++) {

            order.push([j, j + 1, null, null])                  
            if (dupBlocks[j] < dupBlocks[j + 1]) {
                swap(dupBlocks, j, j + 1)
                order.push([j, j + 1, dupBlocks.slice(), null]) 
            }
        }
        order.push([null, null, null, j]) 
    }

    return order
}

export const selectionSortAscending = (arr: number[]) => {

    const dupBlocks = arr.slice() 
    const order = [] 
    
    for (let i = 0; i < dupBlocks.length; i++) {
        for (let j = i + 1; j < dupBlocks.length; j++) {

            order.push([i, j, null, null])                  
            if (dupBlocks[i] > dupBlocks[j]) {
                swap(dupBlocks, i, j)
                order.push([i, j, dupBlocks.slice(), null]) 
            }
        }
        order.push([null, null, null, i])
    }

    return order
}

export const selectionSortDescending = (arr: number[]) => {

    const dupBlocks = arr.slice() 
    const order = [] 
    
    for (let i = 0; i < dupBlocks.length; i++) {
        for (let j = i + 1; j < dupBlocks.length; j++) {

            order.push([i, j, null, null])                  
            if (dupBlocks[i] < dupBlocks[j]) {
                swap(dupBlocks, i, j)
                order.push([i, j, dupBlocks.slice(), null]) 
            }
        }
        order.push([null, null, null, i])
    }

    return order
}

// export const selectionSortAscending = (arr: number[]) => {
//   const { length } = arr;
//   for (let i = 0; i < length - 1; i++) {
//     const minInd = findMinIndex(arr, i);
//     swap(arr, minInd, i);
//   }
//   return arr;
// };

export const findMaxIndex = (arr: number[], start: number): number => {
  let max = arr[start];
  let maxIndex = start;
  for (let i = start + 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxIndex = i;
    }
  }
  return maxIndex;
};

export const findMinIndex = (arr: number[], start: number): number => {
  let min = arr[start];
  let minIndex = start;
  for (let i = start + 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
      minIndex = i;
    }
  }
  return minIndex;
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
