
import { createSlice } from '@reduxjs/toolkit';

import jugadoresServices from '../services/api/jugadores/jugadoresService';


export const getJugadores =  () => (dispatch) => {

     jugadoresServices.getJugadoresService().then((data) => {
        console.log("DATA Jugadores", data)
        dispatch(setJugadores(data.players))
    }
    )
}




export const jugadoresSlice = createSlice({
    name: 'jugadores',
    initialState: {
        jugadores: []
    },
    reducers: {
        setJugadores: (state, action) => {
            state.jugadores = action.payload;
        }   
    }
}
);

export const { setJugadores } = jugadoresSlice.actions;
export default jugadoresSlice.reducer;


