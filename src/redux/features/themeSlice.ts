
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
    },
});

export default themeSlice.reducer;

export const {toggleDarkMode} = themeSlice.actions;
