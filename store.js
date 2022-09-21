// Slices
import albumReducer from "./slices/albumSlice";
import photoReducer from "./slices/photoSlice";

// Dependencies
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		albums: albumReducer,
		photo: photoReducer,
	},
});
