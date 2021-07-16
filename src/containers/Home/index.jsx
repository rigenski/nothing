import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import ButtonColor from "../../components/ButtonColor";
import {
  deleteDataNote,
  getDataNotes,
  postDataNote,
  updateDataNote,
} from "../../config/redux/action";
import Card from "./../../components/Card";

function Home(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("yellow");
  const [isFormFocus, setFormFocus] = useState(false);
  const [isFormValue, setFormValue] = useState(false);
  const noteColor = ["yellow", "blue", "green", "red", "purple"];

  const onFormFocus = () => {
    setFormFocus(true);
  };

  const handleCancelForm = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { lastNote, deleteNote, changeLastNote } = props;

    const data = {
      userId: userData.uid,
      noteId: lastNote,
    };

    if (!title && !content) {
      if (lastNote) {
        deleteNote(data);
      }
    }

    setFormFocus(false);
    changeLastNote();
    getDataNotes();
  };

  const handleSelectColor = (selectColor) => {
    setColor(selectColor);

    if (isFormFocus) {
      const colorContainer = document.querySelector(`.btn-${selectColor}`);
      colorContainer.innerHTML = `<div class="h-full w-full bg-${selectColor}-400 rounded-full"></div>`;
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
    const userData = JSON.parse(localStorage.getItem("user"));
    const { lastNote, saveNote, updateNote } = props;

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      color: color,
      userId: userData.uid,
    };

    if (isFormValue) {
      data.noteId = lastNote;

      updateNote(data);
    } else if (title || content) {
      saveNote(data);

      setFormValue(true);
    }
  };

  const getDataNotes = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { getNotes } = props;

    getNotes(userData.uid);
  };

  const deleteDataNote = (id) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { deleteNote } = props;

    const data = {
      userId: userData.uid,
      noteId: id,
    };

    deleteNote(data);
    getDataNotes();
  };

  useEffect(() => {
    getDataNotes();
  }, []);

  useEffect(() => {
    handleSaveNote();
  }, [title, content, color]);

  useEffect(() => {
    if (isFormFocus) {
      handleSelectColor(color);
    } else {
      setTitle("");
      setContent("");
      setColor("yellow");
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
                  <div className="flex items-center">
                    {props.loading ? (
                      <img
                        src="https://media.tenor.com/images/69305e176c3858ae307c044d47823981/tenor.gif"
                        alt=""
                        className="h-6"
                      />
                    ) : isFormValue ? (
                      <button onClick={handleCancelForm}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={4}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button onClick={handleCancelForm}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={4}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
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
          {props.notes
            .slice(0)
            .reverse()
            .map((note, index) => {
              return (
                <Card
                  data={note}
                  handleRemoveNote={deleteDataNote}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}

const reduxState = (state) => ({
  loading: state.isLoading,
  lastNote: state.lastNote,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  getNotes: (data) => dispatch(getDataNotes(data)),
  saveNote: (data) => dispatch(postDataNote(data)),
  updateNote: (data) => dispatch(updateDataNote(data)),
  deleteNote: (data) => dispatch(deleteDataNote(data)),
  changeLastNote: () => dispatch({ type: "CHANGE_LASTNOTE", value: "" }),
});

export default connect(reduxState, reduxDispatch)(Home);
