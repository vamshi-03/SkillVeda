import axios from "axios";
import {
  actionLoginError,
  actionLoginLoading,
  actionLoginSuccess,
  actionsignUpLoading,
  actionsingUpError,
  actionsingUpSuccess,
} from "./actionType";

const instance = axios.create({
  baseURL: "http://localhost:5000/users/",
});

export const loginFetch = (value) => async (dispatch) => {
  dispatch(actionLoginLoading());
  try {
    const res = await instance.post("login", value);
    dispatch(actionLoginSuccess(res.data));
  } catch (err) {
    dispatch(actionLoginError(err.message));
    console.error("Login Error:", err);
  }
};

export const signUpFetch = (value) => async (dispatch) => {
  dispatch(actionsignUpLoading());
  try {
    const res = await instance.post("register", value);
    dispatch(actionsingUpSuccess());
  } catch (err) {
    dispatch(actionsingUpError(err.response?.data.msg));
    console.error("SignUp Error:", err);
  }
};

// Utility function: Capitalize first letter of each word
export function capitalizeFirstLetter(string) {
  const words = string?.split(" ");
  const capitalizedWords = words?.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords?.join(" ");
}

// Utility function: Write to local storage
export function writeLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Forgot Password Fetch
export const forgotPasswordFetch = (payload) => async (dispatch) => {
  dispatch({ type: "USER_REQUEST" });
  try {
    const response = await axios.post("/api/user/forgot-password", payload);
    dispatch({ type: "USER_SUCCESS", payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: "USER_FAILURE", payload: error.response.data.message });
    return error.response.data;
  }
};
