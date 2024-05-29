import { DataType } from "../type/type";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const dataState = atom<DataType[]>({
  key: "dataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
