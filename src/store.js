import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from "./slices/doctorSlice";
import conditionSlice from "./slices/conditionsSlice";
import appointmentSlice from "./slices/appointmentsSlices";
import userSlice  from "./slices/userDetails";

const store = configureStore({
  reducer: {
    doctorsInfo: doctorSlice,
    conditionsInfo: conditionSlice,
    scheduleInfo: appointmentSlice,
    userInfo: userSlice,

  },
});
export default store;
