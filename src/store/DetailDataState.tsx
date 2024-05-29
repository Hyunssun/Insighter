import { DataType } from "../type/type";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { initialValue } from "../datas/eventData";
const { persistAtom } = recoilPersist();

export const detailDataState = atom<DataType>({
  key: "detailDataState",
  default: initialValue,
  effects_UNSTABLE: [persistAtom],
});
