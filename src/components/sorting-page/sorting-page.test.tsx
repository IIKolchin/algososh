import {
  bubbleSortAscending,
  bubbleSortDescending,
  selectionSortAscending,
  selectionSortDescending,
} from './utils';

describe('Bubble sort', () => {
  it('bubble sorting ascending empty array', () => {
    expect(bubbleSortAscending([])).toEqual([]);
  });

  it('bubble sorting ascending array with one element', () => {
    expect(bubbleSortAscending([3])).toEqual([[null, null, null, 0]]);
  });

  it('bubble sorting ascending with several elements', () => {
    const arr = bubbleSortAscending([8, 7, 81, 14]);
    expect(arr[4][2]).toEqual([7, 8, 14, 81]);
  });

  it('bubble sorting descending empty array', () => {
    expect(bubbleSortDescending([])).toEqual([]);
  });

  it('bubble sorting descending array with one element', () => {
    expect(bubbleSortDescending([3])).toEqual([[null, null, null, 0]]);
  });

  it('bubble sorting descending with several elements', () => {
    const arr = bubbleSortDescending([8, 7, 81, 14]);
    expect(arr[9][2]).toEqual([81, 14, 8, 7]);
  });
});

describe('Selection sort', () => {
  it('selection sorting ascending empty array', () => {
    expect(selectionSortAscending([])).toEqual([]);
  });

  it('selection sorting ascending array with one element', () => {
    expect(selectionSortAscending([3])).toEqual([[null, null, null, 0]]);
  });

  it('selection sorting ascending with several elements', () => {
    const arr = selectionSortAscending([8, 7, 81, 14]);
    expect(arr[9][2]).toEqual([7, 8, 14, 81]);
  });

  it('selection sorting descending empty array', () => {
    expect(selectionSortDescending([])).toEqual([]);
  });

  it('selection sorting descending array with one element', () => {
    expect(selectionSortDescending([3])).toEqual([[null, null, null, 0]]);
  });

  it('selection sorting descending with several elements', () => {
    const arr = selectionSortDescending([8, 7, 81, 14]);
    expect(arr[11][2]).toEqual([81, 14, 8, 7]);
  });
});
