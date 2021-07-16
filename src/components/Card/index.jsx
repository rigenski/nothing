import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteDataNote } from "../../config/redux/action";

function Card(props) {
  const [isOption, setOption] = useState(false);

  const handleOption = () => {
    if (!isOption) {
      setOption(true);
    } else {
      setOption(false);
    }
  };

  return (
    <div className="w-1/2 md:w/1-3 lg:w-1/4 p-1">
      <div
        className={`px-4 py-2 border-2 border-black bg-${props.data.data.color}-400 text-black rounded shadow-child font-child`}
      >
        <div className="flex justify-between items-center">
          <label className="text-xs">
            {new Date(props.data.data.date).toISOString().slice(0, 10)}
          </label>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={handleOption}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
            {isOption ? (
              <span className="btn-delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 absolute mt-1 cursor-pointer btn-delete"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => props.handleRemoveNote(props.data.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </span>
            ) : null}
          </div>
        </div>
        <h2 className="font-semibold mb-2 cursor-pointer">
          {props.data.data.title ? props.data.data.title : "No Title"}
        </h2>
        <p className="text-sm">
          {props.data.data.content
            ? props.data.data.content
            : "No Description Content"}
        </p>
      </div>
    </div>
  );
}

const reduxDispatch = (dispatch) => ({
  deleteNote: (data) => dispatch(deleteDataNote(data)),
});

export default connect(null, reduxDispatch)(Card);
