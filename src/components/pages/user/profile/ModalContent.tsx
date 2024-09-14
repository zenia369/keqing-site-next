"use client";

import { useRouter } from "next/navigation";
import { FC, ReactNode, useState } from "react";

import ModalLayout from "@/components/ui/modal/ModalLayout";

interface ModalContentProps {
  children: ReactNode;
  title: string;
  handleSaveChanges: () => Promise<void>;
}

const ModalContent: FC<ModalContentProps> = ({ handleSaveChanges, children, title }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
    router.refresh();
  };

  const handleSave = async () => {
    setButtonDisabled(true);

    await handleSaveChanges();

    setButtonDisabled(false);

    router.back();
    setTimeout(() => {
      router.refresh();
    }, 100);
  };

  return (
    <ModalLayout className="flex justify-center items-center">
      <div className="bg-white container w-3/4 h-fit rounded p-4">
        <div className="flex justify-between items-center">
          <h4 className="text-black text-xl font-normal">{title}</h4>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-2 bg-green-300 hover:bg-green-400 disabled:bg-green-200 text-white rounded"
              onClick={handleSave}
              disabled={buttonDisabled}
            >
              Зберегти
            </button>
            <button
              type="button"
              className="px-3 py-2 bg-red-300 hover:bg-red-400 disabled:bg-red-200 text-white rounded"
              onClick={handleBack}
              disabled={buttonDisabled}
            >
              Скасувати
            </button>
          </div>
        </div>
        {children}
      </div>
    </ModalLayout>
  );
};

export default ModalContent;
