// Thunks
import { getDetails } from "../thunks/albumThunk";

// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
	details: {},
	is_shown: false,
	is_loading: false,
	selected: null,
	is_large_photo_modal_shown: false,
};

export const photoSlice = createSlice({
	name: "photo",
	initialState,
	reducers: {
		setShow: (state, action) => {
			state.is_shown = action.payload;
		},
		setLoading: (state, action) => {
			state.is_loading = action.payload;
		},
		setSelected: (state, action) => {
			state.selected = action.payload;
		},
		setLargePhotoModalShow: (state, action) => {
			state.is_large_photo_modal_shown = action.payload;
		},
	},
	extraReducers: {
		[getDetails.pending]: (state) => {
			state.is_loading = true;
			state.is_shown = true;
		},
		[getDetails.fulfilled]: (state, action) => {
			state.is_loading = false;
			state.details = action.payload.result;
		},
		[getDetails.rejected]: (state, action) => {
			state.is_loading = false;

			Swal.fire({
				title: "Error!",
				text: action.payload,
				icon: "error",
			});
		},
	},
});

export const { setShow, setLoading, setSelected, setLargePhotoModalShow } =
	photoSlice.actions;

export default photoSlice.reducer;
