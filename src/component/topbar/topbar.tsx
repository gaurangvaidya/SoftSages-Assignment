import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ChangeEventHandler } from "react";
import { FilterFormState } from "../../store/filter/filter.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import React from "react";
import { filterActions } from "../../store/filter/filter.slice";
import { AppDispatch } from "../../store/store.index";
const whiteBackGround = {
  backgroundColor: "white",
  width: "15%",
};

const TopBar = () => {
  const filters: FilterFormState = useAppSelector((state) => state.filter);
  const dispatch: AppDispatch = useAppDispatch();

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    element: string
  ) => {
    if (element === "search") {
      const newFilterState: FilterFormState = {
        ...filters,
        searchText: event.target.value,
      };
      dispatch(filterActions.setFilterData(newFilterState));
    } else if (element === "time") {
      const newFilterState: FilterFormState = {
        ...filters,
        timeFilter: event.target.value,
      };
      dispatch(filterActions.setFilterData(newFilterState));
    } else if (element === "upcoming") {
      const newFilterState: FilterFormState = {
        ...filters,
        isUpcoming: event.target.value,
      };
      dispatch(filterActions.setFilterData(newFilterState));
    } else if (element === "success") {
      const newFilterState: FilterFormState = {
        ...filters,
        isSuccess: event.target.value,
      };
      dispatch(filterActions.setFilterData(newFilterState));
    }
  };
  const clearAll = () => {
    dispatch(
      filterActions.setFilterData({
        timeFilter: "",
        searchText: "",
        isUpcoming: "",
        isSuccess: "",
      })
    );
  };
  return (
    <>
      <TextField
        label="Search"
        variant="filled"
        sx={whiteBackGround}
        value={filters.searchText}
        onChange={(e: any) => onChangeHandler(e, "search")}
      />
      <TextField
        id="timeField"
        label="Time"
        variant="filled"
        sx={whiteBackGround}
        value={filters.timeFilter}
        select
        onChange={(e: any) => onChangeHandler(e, "time")}
      >
        <MenuItem value={"lastWeek"}>Last Week</MenuItem>
        <MenuItem value={"lastMonth"}>Last Month</MenuItem>
        <MenuItem value={"lastYear"}>Last Year</MenuItem>
      </TextField>
      <TextField
        id="upcomingField"
        label="Upcoming"
        variant="filled"
        sx={whiteBackGround}
        value={filters.isUpcoming}
        select
        onChange={(e: any) => onChangeHandler(e, "upcoming")}
      >
        <MenuItem value={"false"}>False</MenuItem>
        <MenuItem value={"true"}>True</MenuItem>
      </TextField>
      <TextField
        id="successField"
        label="Success"
        variant="filled"
        sx={whiteBackGround}
        value={filters.isSuccess}
        select
        onChange={(e: any) => onChangeHandler(e, "success")}
      >
        <MenuItem value={"false"}>False</MenuItem>
        <MenuItem value={"true"}>True</MenuItem>
      </TextField>
      <Button variant="contained"  onClick={clearAll}>
        Clear All
      </Button>
    </>
  );
};
export default TopBar;
