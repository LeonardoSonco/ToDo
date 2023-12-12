import Modal from "react-modal";
import { useState } from "react";
import { login } from "./Login";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    padding: "0",
    "borderRadius": "15px",
  },
};

export default function ModalLogin(props: any) {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  let modal;
  
    console.log(modalIsOpen)

  function closeModal() {
    setModalIsOpen(false);
  }

  if (props.LoginSuccess) {
    console.log("TRUE");
    modal = (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Add Task"
      >
        <div>
          <h2>LOGIN SUCCESS</h2>
        </div>
      </Modal>
    );
  } else {
    console.log("FALSE");
    modal = (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Add Task"
      >
        <div>
          <h2>UNSUCCESSFUL LOGIN</h2>
        </div>
      </Modal>
    );
  }

  return <>{modal}</>;
}
