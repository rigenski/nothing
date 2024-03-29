import firebase, { database } from "../../firebase";

export const authRegister = (data) => () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const authLogin = (data) => () => {
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

        resolve(dataUser);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const postDataNote = (data) => (dispatch) => {
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
        resolve(true);
      })
      .catch((err) => {
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

        dispatch({ type: "NOTES", value: data });
        resolve(true);
      }
    });
  });
};

export const getDataNote = (data) => (dispatch) => {
  const url = database.ref(`notes/${data.userId}/${data.noteId}`);

  return new Promise((resolve, reject) => {
    url.on("value", (snapshot) => {
      const data = snapshot.val();

      resolve(data);
    });
  });
};

export const updateDataNote = (data) => (dispatch) => {
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
          reject(false);
        } else {
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
