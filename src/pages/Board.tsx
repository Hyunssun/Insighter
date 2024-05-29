import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

import Search from "../components/common/Search";
import TableHead from "../components/table/TableHead";
import TableBody from "../components/table/TableBody";

import { pageDivision } from "../utils/pageUtil";
import { DataType } from "../type/type";
import { initialValue } from "../datas/eventData";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { detailDataState } from "../store/DetailDataState";
import { dataListState } from "../store/DataListState";
import { dataState } from "../store/DataState";

import { useNavigate } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai";

const Board = () => {
  const navigate = useNavigate();
  const setDetailData = useSetRecoilState(detailDataState);
  const data = useRecoilValue(dataState);
  const [dataList, setDataList] = useRecoilState<DataType[]>(dataListState);
  const [dataListPage, setDataListPage] = useState<DataType[][]>([]);
  const [page, setPage] = useState<number>(1);

  // 데이터 변경 시 리스트 업데이트
  useEffect(() => {
    setDataList(data);
  }, [data]);

  // 페이지 나누기
  useEffect(() => {
    if (dataList.length > 0) {
      const arr: DataType[] = dataList;
      const result = pageDivision(arr, 10);
      setDataListPage(result);
    }
  }, [dataList]);

  // 글 작성 버튼 클릭 시
  const onClickWrite = () => {
    setDetailData(initialValue);
    navigate("/write");
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="flex flex-col">
        <div className="flex flex-col overflow-x-auto ">
          {/* top */}
          <div className="flex flex-row items-center justify-between">
            <Search
              clearPageCount={() => {
                setPage(1);
              }}
            />
            <button
              type="button"
              data-ripple-light="true"
              onClick={onClickWrite}
            >
              <AiOutlineFileAdd size={40} />
            </button>
          </div>

          {/* main */}
          <div className="inline-block min-w-full py-5 align-middle ">
            <div className="overflow-hidden text-center border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <TableHead />
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {dataList.length !== 0 &&
                  dataListPage.length !== 0 &&
                  dataListPage[page].length !== 0 ? (
                    dataListPage[page].map((item: DataType) => (
                      <TableBody
                        key={item.eventName}
                        itemData={item}
                        dataListPage={dataListPage}
                        clearPageCount={() => {
                          setPage(1);
                        }}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* bottom */}
          <div className="flex flex-row justify-center">
            <Pagination
              count={Math.ceil(dataList.length / 10)}
              page={page}
              onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                setPage(value);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Board;
