import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice";
import messageReducer from "./message";
import regionesSlice from "./regionesSlice"
import equiposReducer from "./equiposSlice";
import torneoReducer from "./torneoSlice";
import fixtureReducer from "./fixtureSlice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  regiones: regionesSlice,
  equipos: equiposReducer,
  torneos: torneoReducer,
  fixture: fixtureReducer,
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;