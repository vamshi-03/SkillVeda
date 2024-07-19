import { writeLocalStorage } from "./action";
import {
  ISUSER_FALSE,
  ISUSER_TRUE,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  SIGNUP_LOADING,
  SINGUP_ERROR,
  SINGUP_SUCCESS,
} from "./actionType";

const initialState = JSON.parse(localStorage.getItem("user")) || {
  email: "",
  name: "",
  role: "",
  token: "",
  isAuth: false,
  isError: "",
  loading: false,
  success: false,
  isUser: false,
  userId: "",
  place: "",
  age: "",
  message: "",
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_LOADING:
      return {
        ...state,
        isAuth: false,
        token: "",
        isError: "",
        loading: true,
      };

    case LOGIN_SUCCESS:
      const loginSuccessState = {
        ...state,
        loading: false,
        isAuth: true,
        token: payload.token,
        name: payload.user.name,
        role: payload.user.role,
        email: payload.user.email,
        userId: payload.user._id,
        place: payload.user.city,
        age: payload.user.age,
        job: payload.user.job,
        message: payload?.msg,
        isError: "",
      };
      writeLocalStorage("user", loginSuccessState);
      return loginSuccessState;

    case LOGIN_ERROR:
      const loginErrorState = {
        ...state,
        loading: false,
        isAuth: false,
        isError: payload,
        token: "",
      };
      writeLocalStorage("user", loginErrorState);
      return loginErrorState;

    case SIGNUP_LOADING:
      const signupLoadingState = {
        ...state,
        isAuth: false,
        token: "",
        isError: "",
        loading: true,
      };
      writeLocalStorage("user", signupLoadingState);
      return signupLoadingState;

    case SINGUP_SUCCESS:
      const signupSuccessState = {
        ...state,
        loading: false,
        success: true,
      };
      writeLocalStorage("user", signupSuccessState);
      return signupSuccessState;

    case SINGUP_ERROR:
      const signupErrorState = {
        ...state,
        loading: false,
        isError: payload,
      };
      writeLocalStorage("user", signupErrorState);
      return signupErrorState;

    case ISUSER_TRUE:
      const isUserTrueState = {
        ...state,
        isUser: true,
      };
      writeLocalStorage("user", isUserTrueState);
      return isUserTrueState;

    case ISUSER_FALSE:
      const isUserFalseState = {
        ...state,
        isUser: false,
      };
      writeLocalStorage("user", isUserFalseState);
      return isUserFalseState;

    case "USER_LOGOUT":
      const userLogoutState = {
        ...state,
        loading: false,
        isAuth: false,
        token: "",
        name: "",
        role: "",
        email: "",
        userId: "",
        message: '',
        age: "",
        job: "",
        place: ""
      };
      writeLocalStorage("user", userLogoutState);
      return userLogoutState;

    default:
      writeLocalStorage("user", state);
      return state;
  }
};

export { reducer };
