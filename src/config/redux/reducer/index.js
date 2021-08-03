const initialState = {
  user: "",
  notes: [],
  darkTheme: false,
  login: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.value,
      };
    case "NOTES":
      return {
        ...state,
        notes: action.value,
      };
    case "IS_DARK-THEME":
      return {
        ...state,
        darkTheme: action.value,
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
