// Slices
import albumReducer from "./slices/albumSlice";

// Dependencies
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		albums: albumReducer,
	},
});
