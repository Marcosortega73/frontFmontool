import { createSlice } from "@reduxjs/toolkit";
import FixtureServices from "../services/api/fixture/fixtureService";



export const getFixture = () => (dispatch) => {

    FixtureServices.getFixtureService().then((data) => {
        console.log("DATA Fixture", data)
        dispatch(setFixture(data))
    }
    )
}




export const fixtureSlice = createSlice({
    name: "fixture",
    initialState: {
        fixture: [],
    },
    reducers: {
        setFixture: (state, action) => {
            state.fixture = action.payload?.fixture;
        },
}
});


export const {setFixture} = fixtureSlice.actions;
export default fixtureSlice.reducer;

