export const swap = <T>(arr: T[], i: number, j: number) => {
    const tmp = arr[i];    
    arr[i] = arr[j];
    arr[j] = tmp;
} 

export const delay = (delayInms: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

  export const randomArr = (
    maxLength: number,
    minLength: number,
    maxValue: number
  ) => {
    const length =
      Math.floor(Math.random() * (maxLength + 1 - minLength)) + minLength;
    if (length >= 3 && length <= 17) {
      return Array.apply(null, Array(length)).map(function () {
        return Math.round(Math.random() * maxValue);
      });
    }
    return Array;
  };