import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import ButtonColor from "../../components/ButtonColor";
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
        .classList.add("border-gray-400");

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
        .classList.remove("border-gray-400");
      radioContainer
        .querySelector(".radio-item")
        .classList.add("border-gray-800");
    };

    const removeRadioColor = (itemColor) => {
      const radioContainer = document.querySelector(`.radio-${itemColor}`);

      radioContainer
        .querySelector(".radio-item")
        .classList.add("border-gray-400");
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

  // set api

  const postDataNote = async () => {
    isLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const { postNoteAPI } = props;

    const data = {
      title: title,
      content: content,
      color: color,
      date: new Date().getTime(),
      userId: user ? user.uid : null,
    };

    await postNoteAPI(data);
    isLoading(false);
    onFormFocus();
    getDataNotes();
  };

  const getDataNotes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { getNotesAPI } = props;

    if (user) {
      getNotesAPI(user.uid);
    }
  };

  const getDataNote = async (note) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { getNoteAPI } = props;

    const data = {
      userId: user.uid,
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
    const user = JSON.parse(localStorage.getItem("user"));
    const { updateNoteAPI } = props;

    const data = {
      title: title,
      content: content,
      color: color,
      date: new Date().getTime(),
      userId: user ? user.uid : null,
      noteId: noteId,
    };

    await updateNoteAPI(data);
    isLoading(false);
    onFormFocus();
    getDataNotes();
    isUpdate(false);
  };

  const deleteDataNote = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { deleteNoteAPI } = props;

    const data = {
      userId: user.uid,
      noteId: id,
    };

    console.log(data);

    deleteNoteAPI(data);
    getDataNotes();
  };

  useEffect(() => {
    const formNote = document.querySelector(".form-note");
    if (formFocus) {
      formNote.classList.remove("-bottom-3/4", "hidden");
      formNote.classList.add("top-0", "bg-gray-800");

      // setup
      handleSelectColor(color);
    } else {
      formNote.classList.remove("top-0", "bg-gray-800");
      formNote.classList.add("-bottom-3/4", "hidden");

      // setup
      setTitle("");
      setContent("");
      setColor("white");
    }
  }, [formFocus]);

  useEffect(() => {
    getDataNotes();
  }, []);

  // useEffect(() => {
  //   console.log(title);
  //   console.log(content);
  //   console.log(color);
  // }, [title, content, color]);

  return (
    <main>
      <div className="container mx-auto pb-4 pt-24 px-3">
        <div>
          <div className="mb-4 px-1">
            <h1 className="text-3xl font-extrabold">My Notes</h1>
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
      <div className="form-note w-full fixed hidden bg-opacity-25 pb-96">
        <div className="px-4 pt-24 pb-96 container max-w-screen-sm mx-auto">
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

      {/*  */}
    </main>
  );
}

const reduxState = (state) => ({
  loading: state.isLoading,
  lastNote: state.lastNote,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  getNoteAPI: (data) => dispatch(getDataNote(data)),
  getNotesAPI: (data) => dispatch(getDataNotes(data)),
  postNoteAPI: (data) => dispatch(postDataNote(data)),
  updateNoteAPI: (data) => dispatch(updateDataNote(data)),
  deleteNoteAPI: (data) => dispatch(deleteDataNote(data)),
  changeLastNote: (data) => dispatch({ type: "LAST_NOTE", value: data }),
});

export default connect(reduxState, reduxDispatch)(Home);
// <main>
//   <div className="container mx-auto py-4 px-2">
//     <div className="flex justify-center px-1">
//       <div className="w-full sm:w-2/4 md:w-2/5 border-2 border-black bg-gray-200 text-black px-4 py-2  rounded shadow-parent">
//         {formFocus ? (
//           <Fragment>
//             <input
//               id="title"
//               type="text"
//               className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black"
//               placeholder="Title"
//               value={title}
//               onChange={(e) => onInputChange(e)}
//             />
//             <textarea
//               id="content"
//               className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 h-40"
//               placeholder="Describe type here ..."
//               value={content}
//               onChange={(e) => onInputChange(e)}
//               autoFocus
//             ></textarea>
//             <div className="flex justify-between items-center mt-2">
//               <div>
//                 {noteColor.map((color, index) => {
//                   return (
//                     <ButtonColor
//                       color={color}
//                       selectColor={handleSelectColor}
//                       key={index}
//                     />
//                   );
//                 })}
//               </div>
//               <div className="flex items-center">
//                 {loading ? (
//                   <img
//                     src="https://media.tenor.com/images/69305e176c3858ae307c044d47823981/tenor.gif"
//                     alt=""
//                     className="h-6"
//                   />
//                 ) : formValue ? (
//                   <button onClick={handleCancelForm}>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-7 w-7 text-green-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={4}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </button>
//                 ) : (
//                   <button onClick={handleCancelForm}>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-7 w-7 text-red-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={4}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </Fragment>
//         ) : (
//           <Fragment>
//             <div
//               className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black text-gray-400 cursor pointer"
//               placeholder="Describe type here ..."
//               onClick={onFormFocus}
//             >
//               Describe type here...
//             </div>
//           </Fragment>
//         )}
//       </div>
//     </div>
//     <div className="flex flex-row flex-wrap mt-6">
//       {props.notes
//         .slice(0)
//         .reverse()
//         .map((note, index) => {
//           return (
//             <Card
//               data={note}
//               handleRemoveNote={deleteDataNote}
//               handleUpdateNote={updateDataNote}
//               key={index}
//             />
//           );
//         })}
//     </div>
//   </div>
// </main>

// const [title, setTitle] = useState("");
// const [content, setContent] = useState("");
// const [color, setColor] = useState("yellow");
// const [formFocus, isFormFocus] = useState(false);
// const [formValue, isFormValue] = useState(false);
// const [loading, isLoading] = useState(false);
// const [userId, setUserId] = useState("");
// const noteColor = ["yellow", "blue", "green", "red", "purple"];

// const onFormFocus = () => {
//   isFormFocus(true);
// };

// const onInputChange = (e) => {
//   if (e.target.id === "title") {
//     setTitle(e.target.value);
//   } else if (e.target.id === "content") {
//     setContent(e.target.value);
//   }
// };

// const handleSelectColor = (selectedColor) => {
//   setColor(selectedColor);

//   const changeButtonColor = (colorItem) => {
//     const colorContainer = document.querySelector(`.btn-${colorItem}`);
//     colorContainer.innerHTML = `<div class="h-full w-full bg-${colorItem}-400 rounded-full"></div>`;
//   };

//   if (formFocus && selectedColor === color) {
//     changeButtonColor(selectedColor);
//   } else if (formFocus && selectedColor !== color) {
//     changeButtonColor(selectedColor);

//     const colorContainerRemove = document.querySelector(`.btn-${color}`);
//     colorContainerRemove.removeChild(colorContainerRemove.firstChild);
//   }
// };

// const handleCancelForm = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const { lastNote, changeLastNote, deleteNoteAPI } = props;

//   const data = {
//     userId: user.uid,
//     noteId: lastNote,
//   };

//   if (!title && !content) {
//     if (lastNote) {
//       deleteNoteAPI(data);
//     }
//   }

//   isFormFocus(false);
//   changeLastNote("");
//   getDataNotes();
// };

// const postDataNote = async () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const { lastNote, postNoteAPI, updateNoteAPI } = props;

//   const data = {
//     title: title,
//     content: content,
//     color: color,
//     date: new Date().getTime(),
//     userId: user ? user.uid : null,
//   };

//   if (formValue === true) {
//     data.noteId = lastNote;

//     isLoading(true);
//     await updateNoteAPI(data);
//     isLoading(false);
//   } else if (title || content) {
//     isLoading(true);
//     await postNoteAPI(data);
//     isLoading(false);

//     isFormValue(true);
//   }
// };

// const getDataNotes = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const { getNotesAPI } = props;

//   if (user) {
//     getNotesAPI(user.uid);
//   }
// };

// const updateDataNote = (note) => {
//   const { changeLastNote } = props;

//   changeLastNote(note.id);
//   isFormFocus(true);
//   setTitle(note.data.title);
//   setContent(note.data.content);
//   setColor(note.data.color);
//   isFormValue(true);
// };

// const deleteDataNote = (id) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const { deleteNoteAPI } = props;

//   const data = {
//     userId: user.uid,
//     noteId: id,
//   };

//   deleteNoteAPI(data);
//   getDataNotes();
// };

// useEffect(() => {
//   getDataNotes();
// }, []);

// useEffect(() => {
//   postDataNote();
// }, [title, content, color]);

// useEffect(() => {
//   if (formFocus) {
//     handleSelectColor(color);
//   } else {
//     setTitle("");
//     setContent("");
//     setColor("yellow");
//     isFormValue(false);
//   }
// }, [formFocus]);
