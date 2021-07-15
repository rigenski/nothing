import React from "react";
import { useHistory } from "react-router-dom";
import Illust from "./../../assets/img/illust-login.svg";

function Register(props) {
  const history = useHistory();

  return (
    <main className="h-screen flex">
      <div className="container my-auto mx-auto py-4 px-4">
        <div className="flex justify-center items-center">
          <div className="w-full sm:w-2/4 md:w-2/5 border-2 border-black bg-gray-200 text-black px-4 py-2 rounded shadow-parent">
            <div className="text-center">
              <div className="flex justify-center">
                <img src={Illust} className="w-60" />
              </div>
              <h1 className="font-parent  text-4xl mt-4 mb-6">nothing</h1>
              <h2 className="font-parent font-semibold text-2xl my-2">
                Register
              </h2>
            </div>
            <div id="form-group" className="w-full font-child">
              <div className="email mt-2">
                <label htmlFor="email">Email :</label>
                <input
                  type="text"
                  className="w-full block outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black"
                  placeholder="user@email.com"
                />
              </div>
              <div className="password mt-2">
                <label htmlFor="email">Password :</label>
                <input
                  type="password"
                  className="w-full block outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black"
                  placeholder="********"
                />
              </div>
              <div className="submit my-4 flex justify-between items-center">
                <p className="text-xs">
                  Sudah punya akun ?,
                  <span
                    onClick={() => history.push("/login")}
                    className="text-base border-b-2 border-black cursor-pointer"
                  >
                    Login
                  </span>
                </p>
                <button className="shadow-child font-child px-4 py-2 bg-yellow-400 border-2 border-black rounded">
                  <span className="cursor-pointer">Register</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
