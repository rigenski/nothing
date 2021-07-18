const initialState = {
  isLoading: false,
  isLogin: false,
  user: {},
  lastNote: "",
  notes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: action.value,
      };
    case "IS_LOGIN":
      return {
        ...state,
        isLogin: action.value,
      };
    case "USER":
      return {
        ...state,
        user: action.value,
      };
    case "LAST_NOTE":
      return {
        ...state,
        lastNote: action.value,
      };
    case "NOTES":
      return {
        ...state,
        notes: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
