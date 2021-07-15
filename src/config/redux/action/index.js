import firebase, { database } from "../../firebase";

export const registerUser = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true });
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        resolve(true);
      })
      .catch((error) => {
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        reject(error);
      });
  });
};
