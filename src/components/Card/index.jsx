import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteDataNote } from "../../config/redux/action";

function Card(props) {
  const [option, isOption] = useState(false);

  const handleOption = () => {
    if (!option) {
      isOption(true);
    } else {
      isOption(false);
    }
  };

  const handleRemoveNote = (id) => {
    props.handleRemoveNote(id);

    isOption(false);
  };

  const handleUpdateNote = (note) => {
    props.handleUpdateNote(note);
  };

  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-1">
      <div
        className={`shadow-md rounded-lg p-3 pb-6 bg-${
          props.note.data.color
        }-400 dark:text-white ${
          props.note.data.color === "white"
            ? "dark:bg-gray-700"
            : `dark:bg-opacity-80`
        }`}
      >
        <div className="flex justify-between items-center">
          <label className="text-xs">
            {new Date(props.note.data.date).toISOString().slice(0, 10)}
          </label>
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => handleOption()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 absolute ${option ? "block" : "hidden"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => handleRemoveNote(props.note.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
        <div
          className="cursor-pointer "
          onClick={() => handleUpdateNote(props.note)}
        >
          <h4 className="text-lg font-bold mb-2">
            {props.note.data.title
              ? props.note.data.title.length > 22
                ? `${props.note.data.title.substring(0, 22)} ...`
                : props.note.data.title
              : "No Title"}
          </h4>
          <p className="text-sm">
            {props.note.data.content
              ? props.note.data.content.length > 280
                ? `${props.note.data.content.substring(0, 280)} ...`
                : props.note.data.content
              : "No Description Content"}
          </p>
        </div>
      </div>
    </div>
  );
}

const reduxDispatch = (dispatch) => ({
  deleteNote: (data) => dispatch(deleteDataNote(data)),
});

export default connect(null, reduxDispatch)(Card);
