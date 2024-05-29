import { DataType } from "../type/type";

/**
 * yyyy-mm-dd 형식
 */
export const dateFormat = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};

/**
 * date 정렬
 */
export const dateSort = (data: DataType[], isAsc: boolean) => {
  const arr: DataType[] = [...data].sort((a: DataType, b: DataType) =>
    isAsc
      ? new Date(a.date).valueOf() - new Date(b.date).valueOf()
      : new Date(b.date).valueOf() - new Date(a.date).valueOf()
  );
  return arr;
};
