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
  const [formFocus, setFormFocus] = useState(false);

  const onFormFocus = () => {
    if (formFocus) {
      setFormFocus(false);
    } else {
      setFormFocus(true);
    }
  };

  useEffect(() => {
    const formNote = document.querySelector(".form-note");
    if (formFocus) {
      formNote.classList.remove("-bottom-3/4", "hidden");
      formNote.classList.add("top-0", "bg-gray-800");
    } else {
      formNote.classList.remove("top-0", "bg-gray-800");
      formNote.classList.add("-bottom-3/4", "hidden");
    }
  }, [formFocus]);

  return (
    <main>
      <div className="container mx-auto pb-4 pt-24 px-3">
        <div>
          <div className="mb-4 px-1">
            <h1 className="text-3xl font-extrabold">My Notes</h1>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="w-1/2 md:w-1/3 lg:w-1/4 p-1">
              <div className="shadow-md rounded-lg p-3 pb-6">
                <div className="">
                  <label className="text-xs">12 June, 2021</label>
                  <h4 className="text-lg font-bold mb-2">Lorem Ipsum</h4>
                  <p className="text-sm">
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Donec neque, auctor sit amet
                    aliquam vel, ullamcorper sit amet ligula. Pellentesque in
                    ipsum id orci porta dapibus. Mauris blandit aliquet elit,
                    eget tincidunt nibh pulvinar a. Praesent sapien ...
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 md:w-1/3 lg:w-1/4 p-1">
              <div className="shadow-md rounded-lg p-3 pb-6">
                <div className="">
                  <label className="text-xs">12 June, 2021</label>
                  <h4 className="text-lg font-bold mb-2">Lorem Ipsum</h4>
                  <p className="text-sm">
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Donec neque, auctor sit amet
                    aliquam vel, ullamcorper sit amet ligula. Pellentesque in
                    ipsum id orci porta dapibus. Mauris blandit aliquet elit,
                    eget tincidunt nibh pulvinar a. Praesent sapien ...
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 md:w-1/3 lg:w-1/4 p-1">
              <div className="shadow-md rounded-lg p-3 pb-6">
                <div className="">
                  <label className="text-xs">12 June, 2021</label>
                  <h4 className="text-lg font-bold mb-2">Lorem Ipsum</h4>
                  <p className="text-sm">
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Donec neque, auctor sit amet
                    aliquam vel, ullamcorper sit amet ligula. Pellentesque in
                    ipsum id orci porta dapibus. Mauris blandit aliquet elit,
                    eget tincidunt nibh pulvinar a. Praesent sapien ...
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 md:w-1/3 lg:w-1/4 p-1">
              <div className="shadow-md rounded-lg p-3 pb-6">
                <div className="">
                  <label className="text-xs">12 June, 2021</label>
                  <h4 className="text-lg font-bold mb-2">Lorem Ipsum</h4>
                  <p className="text-sm">
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Donec neque, auctor sit amet
                    aliquam vel, ullamcorper sit amet ligula. Pellentesque in
                    ipsum id orci porta dapibus. Mauris blandit aliquet elit,
                    eget tincidunt nibh pulvinar a. Praesent sapien ...
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 md:w-1/3 lg:w-1/4 p-1">
              <div className="shadow-md rounded-lg p-3 pb-6">
                <div className="">
                  <label className="text-xs">12 June, 2021</label>
                  <h4 className="text-lg font-bold mb-2">Lorem Ipsum</h4>
                  <p className="text-sm">
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Donec neque, auctor sit amet
                    aliquam vel, ullamcorper sit amet ligula. Pellentesque in
                    ipsum id orci porta dapibus. Mauris blandit aliquet elit,
                    eget tincidunt nibh pulvinar a. Praesent sapien ...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <button
        className="fixed right-6 bottom-12 bg-blue-500 rounded-full shadow-lg p-2"
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

      {/* FORM */}
      <div className="form-note w-full fixed hidden bg-opacity-25">
        <div className="px-4 pt-24 pb-24">
          <div className="shadow-lg rounded-lg bg-white px-4 py-8">
            <input
              type="text"
              className="w-full text-xl font-bold mb-2 outline-none"
              placeholder="Title Note"
            />
            <textarea
              rows="24"
              className="w-full outline-none text-sm mb-6"
              placeholder="Description Note"
            ></textarea>
            <div className="flex justify-between items-center">
              <ul className="flex ">
                <li>
                  <div className="h-6 w-6 bg-white rounded-full border-2 border-gray-800 mr-1"></div>
                </li>
                <li>
                  <div className="h-6 w-6 bg-red-500 rounded-full border-2 border-white mr-1"></div>
                </li>
                <li>
                  <div className="h-6 w-6 bg-blue-500 rounded-full border-2 border-white mr-1"></div>
                </li>
              </ul>
              <div className="flex">
                <label
                  className="text-red-500 border-b-2 border-red-500 font-bold ml-3 px-1"
                  onClick={() => onFormFocus()}
                >
                  Cancel
                </label>
                <label className="text-green-500 border-b-2 border-green-500 font-bold  ml-3 px-1">
                  Save
                </label>
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
