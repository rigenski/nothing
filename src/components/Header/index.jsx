import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import Logo from "./../../assets/img/logo-nothing.svg";

function Header(props) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");

    history.push("/login");
  };

  return (
    <Fragment>
      {props.auth === true ? (
        <header className="shadow-md fixed bg-white w-full z-50">
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center">
              <img src={Logo} className="h-10" alt="logo nothing" />
              <div className="py-2 pl-2">
                <div className="w-6 h-2 m-0 border-b-4 border-gray-800"></div>
                <div className="w-6 h-2 m-0 border-b-4 border-gray-800"></div>
                <div className="w-6 h-2 m-0 border-b-4 border-gray-800"></div>
              </div>
            </div>
          </div>
        </header>
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

export default Header;
