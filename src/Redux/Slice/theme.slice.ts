import { createSlice } from "@reduxjs/toolkit";

// Get the initial theme from localStorage (if it exists), otherwise default to 'light'
const storedTheme = localStorage.getItem('theme');
const initialState = {
    theme: storedTheme ? storedTheme : 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            // Toggle the theme
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            // Save the new theme to localStorage
            localStorage.setItem('theme', state.theme);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
