import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import ButtonColor from "../../components/ButtonColor";
import {
  deleteDataNote,
  postDataNote,
  updateDataNote,
} from "../../config/redux/action";
import Card from "./../../components/Card";

function Home(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [focusColor, setFocusColor] = useState("yellow");
  const [isFormFocus, setFormFocus] = useState(false);
  const [isFormValue, setFormValue] = useState(false);
  const noteColor = ["yellow", "blue", "green", "red", "purple"];

  const onFormFocus = () => {
    setFormFocus(true);
    handleSelectColor(focusColor);
  };

  const handleCancelForm = () => {
    const userData = JSON.parse(localStorage.getItem("auth"));

    const data = {
      userId: userData.uid,
      noteId: props.lastNote,
    };

    if (!title || !content) {
      if (props.lastNote) {
        props.deleteNote(data);
      }
    }

    setFormFocus(false);
  };

  const handleSelectColor = (color) => {
    setFocusColor(color);

    if (isFormFocus) {
      const colorContainer = document.querySelector(`.btn-${color}`);
      colorContainer.innerHTML = `<div class="h-full w-full bg-${color}-400 rounded-full"></div>`;
    }
  };

  const onInputChange = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else if (e.target.id === "content") {
      setContent(e.target.value);
    }
  };

  const handleSaveNote = () => {
    const userData = JSON.parse(localStorage.getItem("auth"));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      color: focusColor,
      userId: userData.uid,
    };

    if (isFormValue) {
      data.noteId = props.lastNote;
      props.updateNote(data);
    } else if (title || content) {
      props.saveNote(data);
      setFormValue(true);
    }
  };

  useEffect(() => {
    handleSaveNote();
  }, [title, content, focusColor]);

  useEffect(() => {
    if (isFormFocus) {
      handleSelectColor(focusColor);
    } else {
      setTitle("");
      setContent("");
      setFormValue(false);
    }
  }, [isFormFocus]);

  return (
    <main>
      <div className="container mx-auto py-4 px-2">
        <div className="flex justify-center px-1">
          <div className="w-full sm:w-2/4 md:w-2/5 border-2 border-black bg-gray-200 text-black px-4 py-2  rounded shadow-parent">
            {isFormFocus ? (
              <Fragment>
                <input
                  id="title"
                  type="text"
                  className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => onInputChange(e)}
                />
                <textarea
                  id="content"
                  className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 h-40"
                  placeholder="Describe type here ..."
                  value={content}
                  onChange={(e) => onInputChange(e)}
                  autoFocus
                ></textarea>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <button onClick={handleCancelForm}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="4"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    {props.loading ? (
                      <img
                        src="https://media.tenor.com/images/69305e176c3858ae307c044d47823981/tenor.gif"
                        alt=""
                        className="h-6 ml-1"
                      />
                    ) : null}
                  </div>
                  <div>
                    {noteColor.map((color, index) => {
                      return (
                        <ButtonColor
                          color={color}
                          selectColor={handleSelectColor}
                          key={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div
                  className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black text-gray-400 cursor pointer"
                  placeholder="Describe type here ..."
                  onClick={onFormFocus}
                >
                  Describe type here...
                </div>
              </Fragment>
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
  loading: state.isLoading,
  lastNote: state.lastNote,
});

const reduxDispatch = (dispatch) => ({
  saveNote: (data) => dispatch(postDataNote(data)),
  updateNote: (data) => dispatch(updateDataNote(data)),
  deleteNote: (data) => dispatch(deleteDataNote(data)),
});

export default connect(reduxState, reduxDispatch)(Home);
