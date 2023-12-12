import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
  },
};

export default function AddTask() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="bg-slate-900 text-white w-36 py-2 rounded-2xl"
        >
          ADD
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Task"
        >
          <div className="flex  flex-col justify-center text-xl ">
            <div className="grid grid-cols-4 mb-3">
              <label
                htmlFor="addTask"
                className="text-center col-start-2 col-span-2"
              >
                Task to be added
              </label>

              <span
                className="material-symbols-outlined hover:cursor-pointer text-end"
                onClick={closeModal}
              >
                cancel
              </span>
            </div>
            <div className="flex w-full justify-end">
              <input
                type="text"
                id="addTask"
                className="border-2 px-2 w-full border-gray-600"
              />
              <button className="w-1/5 border-2 border-gray-600 text-white bg-gray-600 flex items-center justify-center">
                <span className="material-symbols-outlined">check</span>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
