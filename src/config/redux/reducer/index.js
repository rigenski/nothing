const initialState = {
  isLoading: false,
  isLogin: false,
  user: {},
  notes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_ISLOADING":
      return {
        ...state,
        isLoading: action.value,
      };
      break;
    case "CHANGE_ISLOGIN":
      return {
        ...state,
        isLogin: action.value,
      };
      break;
    case "CHANGE_USER":
      return {
        ...state,
        user: action.value,
      };
      break;
    case "SET_NOTES":
      return {
        ...state,
        notes: action.value,
      };
      break;
    default:
      return state;
  }
};

export default reducer;
