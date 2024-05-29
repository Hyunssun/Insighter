import { DataType } from "../type/type";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const dataListState = atom<DataType[]>({
  key: "dataListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
