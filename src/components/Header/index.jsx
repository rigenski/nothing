import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "./../../assets/img/logo-nothing.svg";

function Header(props) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");

    history.push("/login");
  };

  return (
    <header>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="font-app text-3xl font-extrabold">Nothing</h1>
          <img src={Logo} alt="logo nothing" className="h-12" />
        </div>
      </div>
    </header>
    // <header>
    //   <div className="container mx-auto py-4 px-2">
    //     <div className="flex justify-between items-center px-1">
    //       <h1 className="font-parent text-2xl">nothing</h1>
    //       <button className="cursor-default shadow-child font-child px-4 py-2 bg-red-400 border-2 border-black rounded">
    //         <span className="cursor-pointer" onClick={handleLogout}>
    //           Logout
    //         </span>
    //       </button>
    //     </div>
    //   </div>
    // </header>
  );
}

export default Header;
