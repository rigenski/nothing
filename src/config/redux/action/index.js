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
  firebase
    .database()
    .ref("notes/" + data.userId)
    .push({
      title: data.title,
      content: data.content,
      date: data.date,
      color: data.color,
    });
};
