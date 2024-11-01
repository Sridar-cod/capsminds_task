import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  appointments: [],
};
export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = [...state.appointments,action.payload];
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter((_, i) => i !== action.payload);
    },
  },
});
export const { setAppointments,deleteAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
