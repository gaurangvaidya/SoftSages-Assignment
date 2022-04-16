import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterFormState {
  searchText: string;
  timeFilter: string;
  isUpcoming: string;
  isSuccess: string;
}
const initialState: FilterFormState = {
  searchText: "",
  timeFilter: "",
  isUpcoming: "",
  isSuccess: "",
};

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setFilterData (state,action:PayloadAction<FilterFormState>){
            return action.payload
        }
    }

});
export default filterSlice;
export const filterActions = filterSlice.actions;