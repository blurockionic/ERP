import axios from "axios";
import config from "../../config/config";
import toast from "react-hot-toast";

// Create new account handler -- Working
export const signInAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "SIGN_IN_REQUEST",
    });

    const { data } = await axios.post(`${config.apiUrl}/auth/login`, {
      email,
      password,
    });

    dispatch({
      type: "SIGN_IN_SUCCESS",
      payload: { message: data?.message },
    });

    //set in local storage
    localStorage.setItem("token", data?.token);
    localStorage.setItem("user", data?.user);
    toast.success(data?.message);
  } catch (e) {
    dispatch({
      type: "SIGN_IN_FAIL",
      payload: { error: e?.response?.data?.message || e?.message },
    });
    toast.error(e?.response?.data?.message || e?.message);
  }
};
