import { createSlice } from "@reduxjs/toolkit";

export type LanguageSliceType = {
    language: 'en' | 'ru'
}

const initialState: LanguageSliceType = {
    language: 'en'
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload.language;
        }
    }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;