import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/api/auth/authService";


const user = JSON.parse(localStorage.getItem("user"));
const permissions = JSON.parse(localStorage.getItem("permissions"));

//SIN USAR AUN
export const register = createAsyncThunk(
  "/register",
  async ({ email, password }, thunkAPI) => {

    try {
      const response = await AuthService.registerAdmin( email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

//LOGIN

export const login = createAsyncThunk(
  "/login",
  async (dataUser, thunkAPI) => {
    try {
      const data = await AuthService.login(dataUser).then((response) => {
        console.log("Dentro del data redux",response)
        if (response?.permissions?.token) {
          return response
        }
        return response.response
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
      console.log("DATA DEL LOGIN REDUX LOGIN", data)

      if(data.status === 500){
        return thunkAPI.rejectWithValue(data)
      }

      return {data};
    } 
    catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getUpdatedUser = createAsyncThunk(
  "/getUpdatedUser",
  async (dataUser, thunkAPI) => {
    try {
      const data = await AuthService.getUpdatedUser(dataUser).then((response) => {
        console.log(response)
        return response.data
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
      console.log("DATA DEL LOGIN REDUX UPDATE", data)

      if(data.status === 500){
        return thunkAPI.rejectWithValue(data)
      }
      
      return {data};
    }
    catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);




  

export const logout = createAsyncThunk("/logout", async () => {
  await AuthService.logout();
});

const initialState =
  user
  ? { isLoggedIn: true, user,permissions}
  : { isLoggedIn: false, user: null,permissions:null };
  

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.data
      if(action.payload?.data?.permissions){
        state.permissions = action.payload.data.permissions
      }
    },
    [getUpdatedUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data;
    },

    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.permissions = null;
    },
  },
});
const { reducer } = authSlice;
export default reducer;