
import { createSlice } from '@reduxjs/toolkit';

import equiposServices from '../services/api/equipos/equiposServices';


export const getEquipos = () => (dispatch) => {

    equiposServices.getEquipos().then((data) => {
        console.log("DATA EQUIPOS", data.clubes)
        dispatch(setEquipos(data.clubes))
    }
    )
}


export const equiposSlice = createSlice({
    name: 'equipos',
    initialState: {
        equipos: []
    },
    reducers: {
        setEquipos: (state, action) => {
            state.equipos = action.payload;
        }   
    }
}
);

export const { setEquipos } = equiposSlice.actions;
export default equiposSlice.reducer;


