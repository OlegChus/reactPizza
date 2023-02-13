import { createSlice } from '@reduxjs/toolkit';

//начальное состояние
const initialState = {
  categoryId: 0,
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
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;
//**************************    */.actions === reducers
export default filterSlice.reducer;
