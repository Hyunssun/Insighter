import { initialValue } from "../datas/eventData";
import { DataType } from "../type/type";

/**
 * 페이지 나누기
 */
export const pageDivision = (arr: DataType[], num: number) => {
  const divide = Math.ceil(arr.length / num);
  const newArray = [[initialValue]];
  for (let i = 0; i < divide; i++) {
    newArray.push(arr.slice(0 + i * num, num + num * i));
  }
  return newArray;
};
