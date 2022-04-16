import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter/filter.slice";
import missionSlice from "./mission/mission.slice";

const store = configureStore({
  reducer: { mission: missionSlice.reducer, filter:filterSlice.reducer },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
