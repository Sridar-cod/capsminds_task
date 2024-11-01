import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  conditionsList: [],
};

export const conditionSlice = createSlice({
  name: "conditionsList",
  initialState,
  reducers: {
    setConditions: (state, action) => {
      state.conditionsList = action.payload
    },
  }
})

export const { setConditions } = conditionSlice.actions
export default conditionSlice.reducer;