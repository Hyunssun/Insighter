import { useState } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { dataState } from "../../store/DataState";
import { dataListState } from "../../store/DataListState";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IoIosSearch } from "react-icons/io";

type SearchProps = {
  clearPageCount: () => void;
};
type SearchType = {
  startDate: Date;
  endDate: Date;
};

const Search = ({ clearPageCount }: SearchProps) => {
  const setDataList = useSetRecoilState(dataListState);
  const data = useRecoilValue(dataState);

  const [inputValues, setInputValues] = useState<SearchType>({
    startDate: new Date("2024-05"),
    endDate: new Date(),
  });

  // 검색
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const searchText: string = formData.searchText.toString();
    const filteredData = data.filter((item) => {
      return (
        // 검색어
        Object.values(item.eventName)
          .join("")
          .toLowerCase()
          .includes(searchText.toLowerCase()) &&
        // 날짜
        new Date(item.date) >= inputValues.startDate &&
        new Date(item.date) <= inputValues.endDate
      );
    });
    setDataList(filteredData);

    // 첫 페이지로 이동
    clearPageCount();
  };

  return (
    <div className="bg-white border-b-2 border-gray-500 ">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <input
          type="text"
          name="searchText"
          className="w-full px-4 py-1 text-black outline-none"
          placeholder="search"
        />
        <ReactDatePicker
          name="startDate"
          className=" rounded-md border border-[#e0e0e0] py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-blue-300 focus:shadow-md"
          selected={inputValues.startDate}
          dateFormat="yyyy.MM.dd"
          placeholderText="시작 날짜"
          onChange={(date: Date) =>
            setInputValues({ ...inputValues, startDate: date })
          }
        />
        ~
        <ReactDatePicker
          name="endDate"
          className=" rounded-md border border-[#e0e0e0] py-1 px-3 mr-3 text-base font-medium text-[#6B7280] outline-none focus:border-blue-300 focus:shadow-md"
          selected={inputValues.endDate}
          dateFormat="yyyy.MM.dd"
          placeholderText="종료 날짜"
          onChange={(date: Date) =>
            setInputValues({ ...inputValues, endDate: date })
          }
        />
        <button type="submit" className="w-12 h-12 text-black ">
          <IoIosSearch size={25} />
        </button>
      </form>
    </div>
  );
};

export default Search;
