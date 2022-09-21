// Constants
import URL from "../constants/URL";

// Dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getList = createAsyncThunk(
	"album/getList",
	async (param, thunkAPI) => {
		try {
			var url = `${URL.API}/pristime_photos`;

			if (param) {
				url += `?${param}`;
			}

			const result = await axios.get(url);

			return result.data;
		} catch (error) {
			if (error.response && error.response.data.message) {
				return thunkAPI.rejectWithValue(error.response.data.message);
			} else {
				return thunkAPI.rejectWithValue(error.message);
			}
		}
	}
);

export const getDetails = createAsyncThunk(
	"photo/getDetails",
	async (id, thunkAPI) => {
		try {
			const url = `${URL.API}/pristime_photos/${id}`;
			const result = await axios.get(url);

			return result.data;
		} catch (error) {
			if (error.response && error.response.data.message) {
				return thunkAPI.rejectWithValue(error.response.data.message);
			} else {
				return thunkAPI.rejectWithValue(error.message);
			}
		}
	}
);
