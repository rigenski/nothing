const initialState = {
  user: "",
  notes: [],
  darkMode: false,
  login: false,
};

if (!initialState.user) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    initialState.user = user.uid;
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        user: action.value,
      };
    case "NOTES":
      return {
        ...state,
        notes: action.value,
      };
    case "DARK_MODE":
      return {
        ...state,
        darkMode: action.value,
      };
    case "IS_LOGIN":
      return {
        ...state,
        login: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
