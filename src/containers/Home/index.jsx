import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import RadioColor from "../../components/RadioColor";
import {
  deleteDataNote,
  getDataNotes,
  getDataNote,
  postDataNote,
  updateDataNote,
} from "../../config/redux/action";
import Loader from "./../../assets/img/loader.svg";
import Card from "./../../components/Card";

function Home(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("white");
  const [noteId, setNoteId] = useState("");
  const [formFocus, isFormFocus] = useState(false);
  const [update, isUpdate] = useState(false);
  const [loading, isLoading] = useState(false);
  const noteColors = ["white", "blue", "green", "red", "purple"];

  const onFormFocus = () => {
    if (formFocus) {
      const radioContainer = document.querySelector(`.radio-${color}`);

      radioContainer
        .querySelector(".radio-item")
        .classList.remove("border-gray-800");
      radioContainer
        .querySelector(".radio-item")
        .classList.add("border-gray-200");

      isFormFocus(false);
      setTitle("");
      setContent("");
      setColor("white");
      isUpdate(false);
    } else {
      isFormFocus(true);
    }
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

    const changeRadioColor = (itemColor) => {
      const radioContainer = document.querySelector(`.radio-${itemColor}`);

      radioContainer
        .querySelector(".radio-item")
        .classList.remove("border-gray-200");
      radioContainer
        .querySelector(".radio-item")
        .classList.add("border-gray-800");
    };

    const removeRadioColor = (itemColor) => {
      const radioContainer = document.querySelector(`.radio-${itemColor}`);

      radioContainer
        .querySelector(".radio-item")
        .classList.add("border-gray-200");
      radioContainer
        .querySelector(".radio-item")
        .classList.remove("border-gray-800");
    };

    if (formFocus && selectedColor === color) {
      changeRadioColor(selectedColor);
    } else if (formFocus && selectedColor !== color) {
      changeRadioColor(selectedColor);
      removeRadioColor(color);
    }
  };

  const postDataNote = async () => {
    isLoading(true);
    const { postNoteAPI, user } = props;

    const data = {
      title: title,
      content: content,
      color: color,
      date: new Date().getTime(),
      userId: user ? user : null,
    };

    await postNoteAPI(data);
    isLoading(false);
    onFormFocus();
    getDataNotes();
  };

  const getDataNotes = () => {
    const { getNotesAPI, user } = props;

    if (user) {
      getNotesAPI(user);
    }
  };

  const getDataNote = async (note) => {
    const { getNoteAPI, user } = props;

    const data = {
      userId: user,
      noteId: note.id,
    };

    if (user) {
      const res = await getNoteAPI(data);

      isUpdate(true);
      setNoteId(note.id);
      setTitle(res.title);
      setContent(res.content);
      setColor(res.color);

      onFormFocus();
    }
  };

  const updateDataNote = async () => {
    isLoading(true);
    const { updateNoteAPI, user } = props;

    const data = {
      title: title,
      content: content,
      color: color,
      date: new Date().getTime(),
      userId: user ? user : null,
      noteId: noteId,
    };

    await updateNoteAPI(data);
    isLoading(false);
    onFormFocus();
    getDataNotes();
    isUpdate(false);
  };

  const deleteDataNote = (id) => {
    const { deleteNoteAPI, user } = props;

    const data = {
      userId: user,
      noteId: id,
    };

    deleteNoteAPI(data);
    getDataNotes();
  };

  useEffect(() => {
    const formNote = document.querySelector(".form-note");

    if (formFocus) {
      formNote.classList.remove("-bottom-3/4", "hidden");
      formNote.classList.add("top-0", "bg-gray-800");

      handleSelectColor(color);
    } else {
      formNote.classList.remove("top-0", "bg-gray-800");
      formNote.classList.add("-bottom-3/4", "hidden");

      setTitle("");
      setContent("");
      setColor("white");
    }
  }, [formFocus]);

  useEffect(() => {
    getDataNotes();
  }, []);

  return (
    <main className="flex-grow transition dark:bg-gray-800 dark:text-white dark:overflow-hidden">
      <div className="w-full">
        <div className="container mx-auto pb-4 pt-24 px-3">
          <div className="mb-4 px-1">
            <h1 className="text-3xl font-extrabold ">My Notes</h1>
          </div>
          <div className="flex flex-row flex-wrap">
            {props.notes
              .slice(0)
              .reverse()
              .map((note, index) => {
                return (
                  <Card
                    note={note}
                    handleRemoveNote={(id) => deleteDataNote(id)}
                    handleUpdateNote={(note) => getDataNote(note)}
                    key={index}
                  />
                );
              })}
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="w-full left-0 bottom-12 fixed">
        <div className="container mx-auto flex justify-end px-4">
          <button
            className="bottom-12 bg-blue-500 rounded-full shadow-lg p-2 mr-4"
            onClick={() => onFormFocus()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-plus text-white h-12 w-12"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="form-note w-full fixed hidden bg-opacity-25 pb-96 dark:bg-opacity-50">
        <div className="px-4 pt-24 pb-96 container max-w-screen-sm mx-auto dark:text-gray-800">
          <div className="shadow-lg rounded-lg bg-white px-4 py-8">
            <input
              type="text"
              id="title"
              className="w-full text-xl font-bold mb-2 outline-none"
              placeholder="Title Note"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
            <textarea
              id="content"
              rows="16"
              className="w-full outline-none text-sm mb-6"
              placeholder="Description Note"
              value={content}
              onChange={(e) => onInputChange(e)}
              autoFocus
            ></textarea>
            <div className="flex justify-between items-center">
              <ul className="flex">
                {noteColors.map((color, index) => {
                  return (
                    <RadioColor
                      key={index}
                      color={color}
                      selectColor={(selectColor) =>
                        handleSelectColor(selectColor)
                      }
                    />
                  );
                })}
              </ul>
              <div className="flex">
                {loading ? (
                  <img src={Loader} className="h-6" alt="" />
                ) : (
                  <Fragment>
                    <label
                      className="text-red-500 border-b-2 border-red-500 font-bold ml-3 px-1"
                      onClick={() => onFormFocus()}
                    >
                      Cancel
                    </label>
                    {title || content ? (
                      <label
                        className="text-green-500 border-b-2 border-green-500 font-bold  ml-3 px-1"
                        onClick={
                          update ? () => updateDataNote() : () => postDataNote()
                        }
                      >
                        Save
                      </label>
                    ) : null}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const reduxState = (state) => ({
  notes: state.notes,
  user: state.user,
});

const reduxDispatch = (dispatch) => ({
  getNoteAPI: (data) => dispatch(getDataNote(data)),
  getNotesAPI: (data) => dispatch(getDataNotes(data)),
  postNoteAPI: (data) => dispatch(postDataNote(data)),
  updateNoteAPI: (data) => dispatch(updateDataNote(data)),
  deleteNoteAPI: (data) => dispatch(deleteDataNote(data)),
});

export default connect(reduxState, reduxDispatch)(Home);
