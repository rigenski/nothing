import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Logo from "./../../assets/img/logo-nothing.svg";

function Header(props) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");

    history.push("/login");
  };

  const setDarkMode = () => {
    const { darkMode, setDarkMode } = props;

    if (darkMode) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  };

  return (
    <Fragment>
      {props.auth === true ? (
        <Fragment>
          <header className={`${props.darkMode ? "dark" : ""}`}>
            <div className="shadow-md fixed bg-white w-full z-50 dark:bg-gray-800">
              <div className="container mx-auto p-4">
                <div className="flex justify-between items-center">
                  <img src={Logo} className="h-10" alt="logo nothing" />
                  {/* <div className="py-2 pl-2">
                  <div className="w-6 h-2 m-0 border-b-4 border-gray-800"></div>
                  <div className="w-6 h-2 m-0 border-b-4 border-gray-800"></div>
                  <div className="w-6 h-2 m-0 border-b-4 border-gray-800"></div>
                </div> */}
                  <div className="flex">
                    {props.darkMode ? (
                      <button
                        className="hover:bg-gray-700 p-2 mr-2 rounded-lg"
                        onClick={() => setDarkMode()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className="hover:bg-gray-200 p-2 mr-2 rounded-lg"
                        onClick={() => setDarkMode()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-800"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      </button>
                    )}
                    <button
                      className="text-white text-sm  px-4 py-2 rounded-lg bg-red-500"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </Fragment>
      ) : (
        <header>
          <div className="container mx-auto p-4 bg-white w-full">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-extrabold">Nothing</h1>
                <p className="text-md font-medium">note is everything</p>
              </div>
              <img src={Logo} className="h-16" alt="logo nothing" />
            </div>
          </div>
        </header>
      )}
    </Fragment>
  );
}

const reduxState = (state) => ({
  darkMode: state.darkMode,
});

const reduxDispatch = (dispatch) => ({
  setDarkMode: (data) => dispatch({ type: "DARK_MODE", value: data }),
});

export default connect(reduxState, reduxDispatch)(Header);
