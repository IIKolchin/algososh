import { ElementStates } from "../../types/element-states";

export const changeColor = (start: number, end: number, index: number) => {
    if (start === index || end === index) {
      return ElementStates.Changing;
    } else if (start >= index || end <= index) {
      return ElementStates.Modified;
    } 
  };