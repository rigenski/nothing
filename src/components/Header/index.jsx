import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Logo from "./../../assets/img/logo-nothing.svg";

function Header(props) {
  const [drawerNav, isDrawerNav] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    const { isLogin } = props;

    isLogin(false);

    localStorage.removeItem("user");

    history.push("/login");
  };

  const setDarkTheme = () => {
    const { darkTheme, isDarkTheme } = props;

    if (darkTheme) {
      isDarkTheme(false);
    } else {
      isDarkTheme(true);
    }
  };

  const onDrawerClick = () => {
    if (drawerNav) {
      isDrawerNav(false);
    } else {
      isDrawerNav(true);
    }
  };

  return (
    <Fragment>
      {props.login === true ? (
        <Fragment>
          <header className="fixed bg-white w-full shadow-md z-50 transition dark:bg-gray-800">
            <div className="container mx-auto p-4">
              <div className="flex justify-between items-center">
                <img src={Logo} className="h-10" alt="logo nothing" />
                <div className="flex">
                  <button
                    className={`hidden p-2 mr-2 rounded-lg border-2 transition md:block ${
                      props.darkTheme
                        ? "hover:bg-gray-700 border-gray-600"
                        : "hover:bg-gray-200 border-gray-200"
                    }`}
                    onClick={() => setDarkTheme()}
                  >
                    {props.darkTheme ? (
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
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-800"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                  <button
                    className="hidden px-4 py-2 text-white text-sm rounded-lg bg-red-500 transition hover:bg-red-600 md:block"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>

                  {/* drawer */}
                  <div
                    className="py-2 pl-2 flex flex-col items-end cursor-pointer md:hidden"
                    onClick={() => onDrawerClick()}
                  >
                    <div
                      className={`h-2 m-0 border-b-4 border-gray-800 transition dark:border-white ${
                        drawerNav ? "w-6" : "w-2"
                      }`}
                    ></div>
                    <div
                      className={`w-4 h-2 m-0 border-b-4 border-gray-800 transition dark:border-white`}
                    ></div>
                    <div
                      className={`h-2 m-0 border-b-4 border-gray-800 transition dark:border-white ${
                        drawerNav ? "w-2" : "w-6"
                      }`}
                    ></div>
                  </div>
                  {/* end drawer  */}
                </div>
              </div>
            </div>
          </header>

          {/* nav */}
          <div
            className={`fixed w-full h-screen z-40 bg-black bg-opacity-40 md:hidden ${
              drawerNav ? "fixed" : "hidden"
            }`}
          >
            <div className="absolute w-full pb-8 bottom-0 bg-white rounded-t-lg transition dark:bg-gray-800">
              <div className="container mx-auto flex justify-between p-4 ">
                <button
                  className={`p-2 mr-2 rounded-lg border-2 transition md:block ${
                    props.darkTheme
                      ? "hover:bg-gray-700 border-gray-600"
                      : "hover:bg-gray-200 border-gray-200"
                  }`}
                  onClick={() => setDarkTheme()}
                >
                  {props.darkTheme ? (
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
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-800"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
                <button
                  className="px-4 py-2 text-white text-sm rounded-lg bg-red-500 transition hover:bg-red-600"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          {/* end nav */}
        </Fragment>
      ) : (
        <header className="w-full bg-white">
          <div className="container mx-auto p-4">
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
  login: state.login,
  darkTheme: state.darkTheme,
});

const reduxDispatch = (dispatch) => ({
  isLogin: (data) => dispatch({ type: "IS_LOGIN", value: data }),
  isDarkTheme: (data) => dispatch({ type: "IS_DARK-THEME", value: data }),
});

export default connect(reduxState, reduxDispatch)(Header);
