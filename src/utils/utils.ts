import { ElementStates } from "../types/element-states";

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

