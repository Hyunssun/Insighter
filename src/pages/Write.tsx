import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataType } from "../type/type";

import { useRecoilState, useRecoilValue } from "recoil";
import { detailDataState } from "../store/DetailDataState";
import { dataState } from "../store/DataState";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IoArrowBack } from "react-icons/io5";

type WriteProps = {
  // 글 작성: true, 글 수정: flase
  isWrite: boolean;
};

const Write = ({ isWrite }: WriteProps) => {
  const navigate = useNavigate();
  const detailData = useRecoilValue(detailDataState);
  const [data, setData] = useRecoilState<DataType[]>(dataState);
  const [inputDate, setInputDate] = useState<Date>(new Date(detailData.date));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const eventName = formData.eventName.toString();
    const date = new Date(formData.date.toString());
    const time = formData.time.toString();
    const location = formData.location.toString();
    const description = formData.description.toString();

    const arr = [...data];
    const isDuplicatedName = arr.find((item) => item.eventName === eventName);

    // eventName 중복 확인
    if (isDuplicatedName && eventName !== detailData.eventName) {
      alert("존재하는 이벤트 입니다.");
      return;
    }
    if (isWrite) {
      // 글 작성
      arr.push({
        eventName: eventName,
        date: new Date(date),
        time: time,
        location: location,
        description: description,
      });
      setData(arr);
    } else {
      // 글 수정
      const modifyData = arr.map((item) => {
        if (item.eventName === detailData.eventName) {
          return {
            ...item,
            eventName: eventName,
            date: new Date(date),
            time: time,
            location: location,
            description: description,
          };
        } else {
          return item;
        }
      });
      setData(modifyData);
    }

    navigate(-1);
  };

  return (
    <div>
      <div className="flex items-center justify-center px-7">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex flex-row pb-6 ">
            <button
              type="button"
              className="absolute"
              onClick={() => navigate(-1)}
            >
              <IoArrowBack size={30} />
            </button>
            <h1 className="flex-1 text-2xl font-medium text-center">
              {isWrite ? "작성" : "수정"}
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="eventName"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                이벤트명
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                placeholder="이벤트을 입력해주세요"
                className="w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-300 focus:shadow-md"
                defaultValue={detailData.eventName}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="date"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                날짜
              </label>
              <ReactDatePicker
                id="date"
                name="date"
                className="mr-5 w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-300 focus:shadow-md"
                selected={inputDate}
                dateFormat="yyyy.MM.dd"
                onChange={(date: Date) => setInputDate(date)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="time"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                시간
              </label>
              <div className="flex flex-row">
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="mr-5 w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-300 focus:shadow-md"
                  defaultValue={detailData.time}
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="location"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                장소
              </label>
              <input
                type="location"
                id="location"
                name="location"
                placeholder="장소를 입력해주세요"
                className="w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-300 focus:shadow-md"
                defaultValue={detailData.location}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                설명
              </label>
              <input
                type="description"
                id="description"
                name="description"
                placeholder="설명을 입력해주세요"
                className="w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-300 focus:shadow-md"
                defaultValue={detailData.description}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#3A3A3A] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                {isWrite ? "작성 완료" : "수정 완료"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Write;
