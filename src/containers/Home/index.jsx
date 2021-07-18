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
  const [formFocus, isFormFocus] = useState(false);
  const [formValue, isFormValue] = useState(false);
  const [loading, isLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const noteColor = ["yellow", "blue", "green", "red", "purple"];

  const onFormFocus = () => {
    isFormFocus(true);
  };

  const onInputChange = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else if (e.target.id === "content") {
      setContent(e.target.value);
    }
  };

  const handleSelectColor = (selectedColor) => {
    setColor(selectedColor);

    const changeButtonColor = (colorItem) => {
      const colorContainer = document.querySelector(`.btn-${colorItem}`);
      colorContainer.innerHTML = `<div class="h-full w-full bg-${colorItem}-400 rounded-full"></div>`;
    };

    if (formFocus && selectedColor === color) {
      changeButtonColor(selectedColor);
    } else if (formFocus && selectedColor !== color) {
      changeButtonColor(selectedColor);

      const colorContainerRemove = document.querySelector(`.btn-${color}`);
      colorContainerRemove.removeChild(colorContainerRemove.firstChild);
    }
  };

  const handleCancelForm = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { lastNote, changeLastNote, deleteNoteAPI } = props;

    const data = {
      userId: user.uid,
      noteId: lastNote,
    };

    if (!title && !content) {
      if (lastNote) {
        deleteNoteAPI(data);
      }
    }

    isFormFocus(false);
    changeLastNote("");
    getDataNotes();
  };

  const postDataNote = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { lastNote, postNoteAPI, updateNoteAPI } = props;

    const data = {
      title: title,
      content: content,
      color: color,
      date: new Date().getTime(),
      userId: user.uid,
    };

    if (formValue === true) {
      data.noteId = lastNote;

      isLoading(true);
      await updateNoteAPI(data);
      isLoading(false);
    } else if (title || content) {
      isLoading(true);
      await postNoteAPI(data);
      isLoading(false);

      isFormValue(true);
    }
  };

  const getDataNotes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { getNotesAPI } = props;

    getNotesAPI(user.uid);
  };

  const updateDataNote = (note) => {
    const { changeLastNote } = props;

    changeLastNote(note.id);
    isFormFocus(true);
    setTitle(note.data.title);
    setContent(note.data.content);
    setColor(note.data.color);
    isFormValue(true);
  };

  const deleteDataNote = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { deleteNoteAPI } = props;

    const data = {
      userId: user.uid,
      noteId: id,
    };

    deleteNoteAPI(data);
    getDataNotes();
  };

  useEffect(() => {
    getDataNotes();
  }, []);

  useEffect(() => {
    postDataNote();
  }, [title, content, color]);

  useEffect(() => {
    if (formFocus) {
      handleSelectColor(color);
    } else {
      setTitle("");
      setContent("");
      setColor("yellow");
      isFormValue(false);
    }
  }, [formFocus]);

  return (
    <main>
      <div className="container mx-auto py-4 px-2">
        <div className="flex justify-center px-1">
          <div className="w-full sm:w-2/4 md:w-2/5 border-2 border-black bg-gray-200 text-black px-4 py-2  rounded shadow-parent">
            {formFocus ? (
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
                    {loading ? (
                      <img
                        src="https://media.tenor.com/images/69305e176c3858ae307c044d47823981/tenor.gif"
                        alt=""
                        className="h-6"
                      />
                    ) : formValue ? (
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
                  handleUpdateNote={updateDataNote}
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
  getNotesAPI: (data) => dispatch(getDataNotes(data)),
  postNoteAPI: (data) => dispatch(postDataNote(data)),
  updateNoteAPI: (data) => dispatch(updateDataNote(data)),
  deleteNoteAPI: (data) => dispatch(deleteDataNote(data)),
  changeLastNote: (data) => dispatch({ type: "LAST_NOTE", value: data }),
});

export default connect(reduxState, reduxDispatch)(Home);
