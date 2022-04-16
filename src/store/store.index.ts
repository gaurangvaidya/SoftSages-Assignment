import { configureStore } from "@reduxjs/toolkit";
import missionSlice from "./mission/mission.slice";

const store = configureStore({
  reducer: { mission: missionSlice.reducer },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
