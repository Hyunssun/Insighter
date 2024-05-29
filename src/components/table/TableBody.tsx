import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataType } from "../../type/type";
import { dateFormat } from "../../utils/dateUtil";

import { useRecoilState, useSetRecoilState } from "recoil";
import { detailDataState } from "../../store/DetailDataState";
import { dataState } from "../../store/DataState";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { MdOutlineNoteAlt } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

type tableBodyProps = {
  itemData: DataType;
  dataListPage: DataType[][];
  clearPageCount: () => void;
};

const TableBody = ({
  itemData,
  dataListPage,
  clearPageCount,
}: tableBodyProps) => {
  const navigate = useNavigate();
  const setDetailData = useSetRecoilState(detailDataState);
  const [data, setData] = useRecoilState<DataType[]>(dataState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 게시물 수정
  const onClickModify = () => {
    setDetailData({
      eventName: itemData.eventName,
      date: itemData.date,
      time: itemData.time,
      location: itemData.location,
      description: itemData.description,
    });
    navigate("/edit");
  };

  // 게시물 삭제
  const onClickDelete = () => {
    const filteredData: DataType[] = [...data].filter((item) => {
      return item.eventName !== itemData.eventName;
    });
    setData(filteredData);

    // 마지막 페이지일 때 첫 페이지로 이동
    if (dataListPage[dataListPage.length - 1].length === 1) {
      clearPageCount();
    }
    closeModal();
  };

  return (
    <>
      <tr>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <span>{itemData.eventName}</span>
        </td>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <span>{dateFormat(itemData.date)}</span>
        </td>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <span>{itemData.time}</span>
        </td>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <span>{itemData.location}</span>
        </td>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <span>{itemData.description}</span>
        </td>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div>
            <div className="flex gap-x-3">
              <button type="button" onClick={onClickModify}>
                <MdOutlineNoteAlt size={34} />
              </button>
              <button type="button" onClick={openModal}>
                <FaRegTrashAlt size={28} />
              </button>
            </div>
          </div>
        </td>
      </tr>
      {/* 삭제 모달 */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
      >
        <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-md text-center px-10 py-5">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            삭제
          </Typography>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            삭제하시겠습니까?
          </Typography>
          <div className="flex justify-center gap-4 pt-5">
            <button type="button" onClick={closeModal}>
              취소
            </button>
            <button type="button" onClick={onClickDelete}>
              확인
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default TableBody;
