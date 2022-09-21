// Thunks
import { getList } from "../thunks/albumThunk";

// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
	data: [],
	current_page: null,
	next_page_url: null,
	prev_page_url: null,
	total: null,
	total_page: null,
	per_page: null,
	is_shown: false,
	is_loading: false,
	cart: [],
	is_cart_modal_shown: false,
	is_download_form_modal_shown: false,
	is_download_loading: false,
};

export const albumSlice = createSlice({
	name: "albums",
	initialState,
	reducers: {
		setShow: (state, action) => {
			state.is_shown = action.payload;
		},
		setCart: (state, action) => {
			state.cart = action.payload;
		},
		setLoading: (state, action) => {
			state.is_loading = action.payload;
		},
		setCartModalShow: (state, action) => {
			state.is_cart_modal_shown = action.payload;
		},
		setDownloadFormModalShow: (state, action) => {
			state.is_download_form_modal_shown = action.payload;
		},
		setDownloadLoading: (state, action) => {
			state.is_download_loading = action.payload;
		},
	},
	extraReducers: {
		[getList.pending]: (state) => {
			state.is_loading = true;
			state.is_shown = true;
		},
		[getList.fulfilled]: (state, action) => {
			state.is_loading = false;
			state.data = action.payload.result.data;
			state.current_page = action.payload.result.current_page;
			state.next_page_url = action.payload.result.next_page_url;
			state.prev_page_url = action.payload.result.prev_page_url;
			state.total = action.payload.result.total;
			state.total_page = action.payload.result.total_page;
			state.per_page = action.payload.result.per_page;
		},
		[getList.rejected]: (state, action) => {
			state.is_loading = false;

			Swal.fire({
				title: "Error!",
				text: action.payload,
				icon: "error",
			});
		},
	},
});

export const {
	setShow,
	setLoading,
	setCart,
	setCartModalShow,
	setDownloadFormModalShow,
	setDownloadLoading,
} = albumSlice.actions;

export default albumSlice.reducer;
