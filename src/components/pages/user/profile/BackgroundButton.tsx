"use client";

import { useState } from "react";
import { FaRegEye } from "react-icons/fa";

import Modal from "@/components/ui/modal/Modal";
import ModalLayout from "@/components/ui/modal/ModalLayout";
import Tooltip from "@/components/ui/tooltip/Tooltip";

type BackgroundButtonProps = {
  background: string;
};

const BackgroundButton = ({ background }: BackgroundButtonProps) => {
  const [showPhoto, setShowPhoto] = useState(false);

  const handleSetShowPhoto = () => {
    setShowPhoto(!showPhoto);
  };

  return (
    <>
      <Tooltip text="Open background photo">
        <button
          className="p-2 px-4 border border-purple-300 text-purple-200 rounded hover:bg-purple-300 hover:text-white h-full"
          onClick={handleSetShowPhoto}
        >
          <FaRegEye />
        </button>
      </Tooltip>
      {showPhoto ? (
        <Modal>
          <ModalLayout className="flex justify-center items-center">
            <div className="bg-white rounded m-10 p-5">
              <div className="flex justify-center items-center gap-6">
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src={background}
                  alt="Profile background"
                  className="max-h-[400px] min-h-[400px]"
                />
                <button
                  className="p-2 px-4 border bg-purple-400 border-purple-300 text-white rounded self-start"
                  onClick={handleSetShowPhoto}
                >
                  close
                </button>
              </div>
            </div>
          </ModalLayout>
        </Modal>
      ) : null}
    </>
  );
};

export default BackgroundButton;
