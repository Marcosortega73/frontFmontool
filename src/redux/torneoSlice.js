import { createSlice } from "@reduxjs/toolkit";
import torneosServices from "../services/api/torneos/torneosService";


export const getTorneos = () => (dispatch) => {

    torneosServices.getTorneosService().then((data) => {
        console.log("DATA TORNEOS", data)
        dispatch(setTorneos(data))
    }
    )
}




export const torneoSlice = createSlice({
    name: "torneos",
    initialState: {
        torneos: [],
        temporadas: []
    },
    reducers: {
        setTorneos: (state, action) => {
            state.torneos = action.payload?.torneos;
        },
        setTemporadas: (state, action) => {
            state.temporadas= action.payload?.temporada;
    }
}
});


export const { setTorneos,setTemporadas} = torneoSlice.actions;
export default torneoSlice.reducer;

