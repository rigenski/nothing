import firebase, { database } from "../../firebase";

export const registerUser = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true });
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        resolve(res);
      })
      .catch((error) => {
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        reject(error);
      });
  });
};

export const loginUser = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true });
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken,
        };

        dispatch({ type: "CHANGE_ISLOADING", value: false });
        resolve(dataUser);
      })
      .catch((error) => {
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        reject(error);
      });
  });
};

export const postDataNote = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true });
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("notes/" + data.userId)
      .push({
        title: data.title,
        content: data.content,
        date: data.date,
        color: data.color,
      })
      .then((res) => {
        const data = res._delegate._path.pieces_;
        const id = data.slice(-1)[0];

        dispatch({ type: "CHANGE_LASTNOTE", value: id });
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        resolve(true);
      })
      .catch((err) => {
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        reject(err);
      });
  });
};

export const getDataNotes = (userId) => (dispatch) => {
  const url = database.ref("notes/" + userId);
  return new Promise((resolve, reject) => {
    url.once("value").then((snapshot) => {
      const data = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).map((key) => {
          data.push({
            id: key,
            data: snapshot.val()[key],
          });
        });

        dispatch({ type: "SET_NOTES", value: data });
        resolve(true);
      }
    });
  });
};

export const updateDataNote = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true });

  const url = database.ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    url.set(
      {
        title: data.title,
        content: data.content,
        date: data.date,
        color: data.color,
      },
      (err) => {
        if (err) {
          dispatch({ type: "CHANGE_ISLOADING", value: false });
          reject(false);
        } else {
          dispatch({ type: "CHANGE_ISLOADING", value: false });
          resolve(true);
        }
      }
    );
  });
};

export const deleteDataNote = (data) => (dispatch) => {
  const url = database.ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    url.remove();
  });
};
