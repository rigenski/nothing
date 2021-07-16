import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { postDataNote } from "../../config/redux/action";
import Card from "./../../components/Card";

function Home(props) {
  const [isFormFocus, setFormFocus] = useState(false);

  const onFormFocus = () => {
    setFormFocus(true);
  };

  return (
    <main>
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-center">
          <div className="w-full sm:w-2/4 md:w-2/5 border-2 border-black bg-gray-200 text-black px-4 py-2 rounded shadow-parent">
            {isFormFocus ? (
              <Fragment>
                <input
                  type="text"
                  className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black"
                  placeholder="Title"
                />
                <textarea
                  className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 h-40"
                  placeholder="Describe type here ..."
                  autoFocus
                ></textarea>
                <div className="flex justify-between mt-2">
                  <div className="">
                    <button
                      className="h-5 w-5 bg-white rounded-full border-2 ml-1 border-yellow-400"
                      value="yellow"
                    ></button>
                    <button
                      className="h-5 w-5 bg-white rounded-full border-2 ml-1 border-blue-400"
                      value="blue"
                    ></button>
                    <button
                      className="h-5 w-5 bg-white rounded-full border-2 ml-1 border-green-400"
                      value="green"
                    ></button>
                    <button
                      className="h-5 w-5 bg-white rounded-full border-2 ml-1 border-red-400"
                      value="red"
                    ></button>
                    <button
                      className="h-5 w-5 bg-white rounded-full border-2 ml-1 border-purple-400"
                      value="purple"
                    ></button>
                  </div>
                </div>
              </Fragment>
            ) : (
              <input
                type="text"
                className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black"
                placeholder="Describe type here ..."
                onFocus={onFormFocus}
              />
            )}
          </div>
        </div>
        <div className="flex flex-row flex-wrap mt-6">
          <Card color="blue" />
          <Card color="yellow" />
          <Card color="red" />
          <Card color="yellow" />
          <Card color="green" />
          <Card color="purple" />
        </div>
      </div>
    </main>
  );
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  postDataNote: (data) => dispatch(postDataNote(data)),
});

export default connect(reduxState, reduxDispatch)(Home);
