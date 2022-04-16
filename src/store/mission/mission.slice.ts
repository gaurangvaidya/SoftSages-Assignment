import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mission } from "../../constants/mission.model";

interface MissionState {
  missions: Mission[] | [];
  originalMissions:Mission[] | [];
}
const initialState: MissionState = {
  missions: [],
  originalMissions:[]
};

const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    replaceMissions(state, action: PayloadAction<Mission[]>) {
      state.missions = [...action.payload];
    },
    storeOriginalMissions(state,action: PayloadAction<Mission[]>){
      state.originalMissions = [...action.payload]
    }
  },
});
export default missionSlice;
export const missionActions = missionSlice.actions;
