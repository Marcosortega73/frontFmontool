import { createSlice } from "@reduxjs/toolkit";
import regionesServices from "../services/api/regiones/regionesServices";


export const getRegiones = () => (dispatch)=>{

    regionesServices.getNacionalidades().then((data)=>{
        dispatch(setNations(data))
    }
    )   
    regionesServices.getContinentes().then((data)=>{
        dispatch(setContinents(data))
    }
    )

}

export const regionesSlice = createSlice({
    name: "regiones",
    initialState: {
        nations: [],
        continents: []
    },
    reducers: {
        setNations: (state, action) => {
            state.nations = action.payload;
        },
        setContinents: (state, action) => {
            state.continents= action.payload?.continents;
    }
}
});


export const { setNations,setContinents} = regionesSlice.actions;
export default regionesSlice.reducer;

