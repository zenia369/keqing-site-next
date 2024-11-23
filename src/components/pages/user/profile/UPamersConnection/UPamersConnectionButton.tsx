"use client";

import { useState } from "react";

import Modal from "@/components/ui/modal/Modal";
import ModalLayout from "@/components/ui/modal/ModalLayout";

import { connectionPrepareUPamers } from "../services";

const connectionButtonMessages = {
  connect: "Під'єднати",
  prepare: "Підготовка до перенаправлення",
  progress: "Перенаправлення... Після успішного підключення перезавантажте цю сторінку",
  failed: "Етап підготовлення не вдалося виконати, спробуйте ще раз",
};

const UPamersConnectionButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(connectionButtonMessages.connect);
  const [connectionButtonDisabled, setConnectionButtonDisabled] = useState(false);

  const handleSetShowModal = () => {
    setShowModal(!showModal);
  };

  const handleConnectionClick = async () => {
    try {
      setConnectionButtonDisabled(true);
      setMessage(connectionButtonMessages.prepare);

      const prepareState = await connectionPrepareUPamers();

      setMessage(connectionButtonMessages.progress);

      window.open(prepareState.url, "_blank");
    } catch (error) {
      setMessage(connectionButtonMessages.failed);
      setConnectionButtonDisabled(false);
    }
  };

  return (
    <>
      <button
        className="p-2 px-4 border border-purple-300 text-purple-200 rounded hover:bg-purple-300 hover:text-white"
        onClick={handleSetShowModal}
      >
        Підклюдись до U-Pamers
      </button>
      {showModal ? (
        <Modal>
          <ModalLayout className="flex justify-center items-center">
            <div className="bg-white rounded m-10 p-5 max-w-[600px]">
              <div className="flex justify-between items-center gap-5">
                <h2 className="text-black text-xl font-medium">
                  З&apos;єднай <span className="text-purple-500">Keqing-site</span> профіль з
                  U-pamers спільнотою!
                </h2>
                <button
                  className="p-2 px-4 border bg-purple-400 border-purple-300 text-white rounded self-start"
                  onClick={handleSetShowModal}
                  type="button"
                >
                  Закрити
                </button>
              </div>
              <p className="text-base text-black mt-5">
                Приєднуйтесь до спільноти U-pamers, знаходьте однодумців і починайте з ними
                спілкуватися з ними, де б ви не знаходилися.
              </p>
              <p className="text-base text-black mt-5">
                Приєднуючись до спільноти U-pamers, ви даєте свою згоду:
              </p>
              <ul className="list-disc text-sm">
                <li className="ml-5">Обмін даними між U-pamers та порталами Keqing-сайту</li>
                <li className="ml-5">Конфіденційність та умови користування порталом U-pamers</li>
              </ul>
              <button
                className="w-full mt-10 px-3 py-2 bg-green-300 hover:bg-green-400 disabled:bg-green-200 text-white rounded disabled:cursor-not-allowed"
                type="button"
                onClick={handleConnectionClick}
                disabled={connectionButtonDisabled}
              >
                {message}
              </button>
            </div>
          </ModalLayout>
        </Modal>
      ) : null}
    </>
  );
};

export default UPamersConnectionButton;
