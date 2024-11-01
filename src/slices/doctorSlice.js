import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  doctorsList: []
};
export const doctorSlice = createSlice({
  name: "doctorList",
  initialState,
  reducers: {
    setDoctor: (state, action) => {
      state.doctorsList = action.payload
    },
  }
})
export const { setDoctor } = doctorSlice.actions
export default doctorSlice.reducer;