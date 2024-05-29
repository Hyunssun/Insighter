import { useState } from "react";
import { DataType } from "../../type/type";

import { useRecoilState } from "recoil";
import { dataListState } from "../../store/DataListState";

import { FaSort } from "react-icons/fa6";
import { dateSort } from "../../utils/dateUtil";

const TableHead = () => {
  const [dataList, setDataList] = useRecoilState<DataType[]>(dataListState);
  const [isAsc, setIsAsc] = useState<boolean>(true);

  // 날짜 정렬
  const onClickSort = () => {
    setDataList(dateSort(dataList, isAsc));
    setIsAsc(!isAsc);
  };

  return (
    <thead className="bg-gray-50 ">
      <tr>
        <th
          scope="col"
          className="px-4 py-3.5 text-sm font-normal text-gray-500 "
        >
          Event
        </th>
        <th
          scope="col"
          className="flex items-center justify-center px-4 py-3.5 text-sm font-normal text-gray-500 "
        >
          <button
            type="button"
            onClick={onClickSort}
            className="flex flex-row items-center justify-center"
          >
            Date
            <FaSort size={16} />
          </button>
        </th>
        <th
          scope="col"
          className="px-4 py-3.5 text-sm font-normal text-gray-500 "
        >
          Time
        </th>
        <th
          scope="col"
          className="px-4 py-3.5 text-sm font-normal text-gray-500 "
        >
          Location
        </th>
        <th
          scope="col"
          className="px-4 py-3.5 text-sm font-normal text-gray-500 "
        >
          Description
        </th>
        <th
          scope="col"
          className="px-4 py-3.5 text-sm font-normal text-gray-500 "
        >
          Function
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
