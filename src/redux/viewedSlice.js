import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../constants";

const initialState = {
  latestBooks: [],
  currentBook: null,
  openModal: false,
};

export const getBookDetails = createAsyncThunk(
  "viewed/getBookDetails",
  async (id) => {
    try {
      const bookResponse = await axios.get(`${API_URL}/books/${id}`);
      return bookResponse.data;
    } catch (e) {}
  }
);

export const viewedSlice = createSlice({
  name: "viewed",
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    setCurrentBook(state, action) {
      state.currentBook = action.payload;
    },
    addCurrentBookToViewedQueue(state, action) {
      const filteredLatestBooks = state.latestBooks.filter(
        (book) => book.id !== action.payload.id
      );
      state.latestBooks = [action.payload, ...filteredLatestBooks];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookDetails.fulfilled, (state, action) => {
      state.currentBook = action.payload;
      state.openModal = true;
    });
  },
});

export const { setOpenModal, setCurrentBook, addCurrentBookToViewedQueue } =
  viewedSlice.actions;

export default viewedSlice.reducer;
