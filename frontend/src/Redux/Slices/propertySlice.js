import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    properties: [],
    error: null,
    property: null,
    paginatedProperties: [],
    loading: false,
};

const propertySlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
        setloading: (state) => {
            state.loading = true;
        },
        setProperties: (state, { payload }) => {
            state.loading = false;
            state.properties = payload;
        },
        setProperty: (state, { payload }) => {
            state.loading = false;
            state.property= payload;
        },
        removeProperty: (state, action) => {
            state.properties = state.properties.filter(
                (property) => property._id !== action.payload
            );
        },
        setError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});
export const { setloading, setError, setProperty, setProperties, removeProperty } = propertySlice.actions;

export default propertySlice.reducer;
