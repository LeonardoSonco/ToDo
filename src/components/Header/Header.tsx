import { SetStateAction, useEffect, useState } from "react";
import Modal from "react-modal";
import styleInput from "./InputStyle.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "./Login/Login";

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
    borderRadius: "15px",
  },
};

type UserType = {
  UserId: string;
  UserName: string;
};

interface HeaderProps {
  onUserLogin: (user: UserType) => void;
}

export default function Header({ onUserLogin }: HeaderProps) {
  const [menuHamburguer, setMenuHamburguer] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [feedbackModalIsOpen, setFeedbackModalIsOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [valuePassword, setValuePassword] = useState({
    password: "",
    showPassword: false,
  });
  const [valueUsername, setValueUsername] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMenuHamburguer(true);
      } else {
        setMenuHamburguer(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setValuePassword({ ...valuePassword, showPassword: false });
  }

  const handleClickShowPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setValuePassword({
      ...valuePassword,
      showPassword: !valuePassword.showPassword,
    });
  };

  const handlePasswordChange =
    (prop: any) => (event: { target: { value: any } }) => {
      setValuePassword({ ...valuePassword, [prop]: event.target.value });
    };

  const handleUsernameChange =
    (prop: any) => (event: { target: { value: any } }) => {
      setValueUsername(event.target.value);
    };

  const openFeedbackModal = (message: SetStateAction<string>) => {
    setFeedbackMessage(message);
    setFeedbackModalIsOpen(true);
  };

  const closeFeedbackModal = () => {
    setFeedbackModalIsOpen(false);
    setFeedbackMessage("");
  };
  const handleLogin = async () => {
    const user = await login(valueUsername, valuePassword.password);
    setShowModalLogin(false);

    if (!user) {
      openFeedbackModal("Login failed. Please check your credentials.");
    } else {
      let User = {
        UserId: user.objectId,
        UserName: user.username,
      };
      onUserLogin(User);
      openFeedbackModal("Login successful!");
      setIsLoggedIn(true);
      closeModal();
    }
  };

  const handleLogout = () => {
    let User = {
      UserId: "",
      UserName: "",
    };
    onUserLogin(User);
    setIsLoggedIn(false);
  };

  return (
    <>
      {menuHamburguer ? (
        <div className="flex justify-between mx-11 mt-10">
          <a href="/">
            <h1>ToDo</h1>
          </a>
          <nav>
            <section className="MOBILE-MENU flex lg:hidden">
              <div
                className="HAMBURGER-ICON space-y-2"
                onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
              >
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              </div>

              <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                {" "}
                <div
                  className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                  onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
                >
                  <svg
                    className="h-8 w-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <a href="/about">About</a>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <a href="/portfolio">Login / Register</a>
                  </li>
                </ul>
                <style>{`
                  .hideMenuNav {
                    display: none;
                  }
                  .showMenuNav {
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 100vh;
                    top: 0;
                    left: 0;
                    background: white;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                  }
                `}</style>
              </div>
            </section>
          </nav>
        </div>
      ) : (
        <div className="flex justify-around mt-10">
          <div>
            <h1>ToDo</h1>
          </div>
          <div>
            {isLoggedIn ? (
              <button onClick={handleLogout}>
                <h3>Logout</h3>
              </button>
            ) : (
              <button onClick={openModal}>
                <h3>Login / Register</h3>
              </button>
            )}

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true}
              ariaHideApp={false}
              style={customStyles}
              contentLabel="Add Task"
            >
              <h2 className="text-center font-semibold text-2xl border-b-2 py-3">
                Login
              </h2>

              <form className="flex flex-col gap-8 mx-6 py-4">
                <div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className={`border-b-2 w-full ${styleInput.input}`}
                    onChange={handleUsernameChange("username")}
                  />
                </div>
                <div>
                  <div className="flex ">
                    <input
                      type={valuePassword.showPassword ? "text" : "password"}
                      onChange={handlePasswordChange("password")}
                      name="password"
                      id="password"
                      placeholder="Password"
                      className={`border-b-2 w-full ${styleInput.input}`}
                    />
                    <button
                      className="border-b-2"
                      onClick={handleClickShowPassword}
                    >
                      {valuePassword.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </button>
                  </div>

                  <a href="#" className="text-xs text-gray-500 mt-2">
                    Forget password?
                  </a>
                </div>
              </form>
              <div className="flex flex-col justify-center items-center mx-6 gap-3">
                <button
                  className="border-2 w-full rounded-3xl py-1"
                  onClick={handleLogin}
                >
                  Login
                </button>

                <span className="text-sm mb-4">
                  Not a member?{" "}
                  <a href="#" className="text-blue-600">
                    Singup
                  </a>
                </span>
              </div>
            </Modal>
            <Modal
              isOpen={feedbackModalIsOpen}
              onRequestClose={closeFeedbackModal}
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true}
              ariaHideApp={false}
              style={customStyles}
              contentLabel="Feedback"
            >
              <h2 className="text-center font-semibold text-2xl border-b-2 py-3">
                Feedback
              </h2>
              <div className="flex flex-col justify-center items-center mx-6 gap-3">
                <p>{feedbackMessage}</p>
                <button onClick={closeFeedbackModal}>
                  <h3>Close</h3>
                </button>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}
