import { createSlice } from '@reduxjs/toolkit';

//начальное состояние
const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  //****************************** reducers - actions
  reducers: {
    setCategoryId(state, action) {
      //*********************state - состояние,  action - действие
      // console.log(action);
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
      // console.log(state.sort);
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = +action.payload.currentPage;
      state.categoryId = +action.payload.categoryId;
    },
  },
});
export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;
//**************************    */.actions === reducers
export default filterSlice.reducer;
