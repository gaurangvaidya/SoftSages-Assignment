import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMission } from "../store/mission/mission.actions";
import {  Grid } from "@mui/material";
import { Mission } from "../constants/mission.model";
import MissionCard from "../component/missioncard/missoncard";
import styles from "./homepage.module.css";
import TopBar from "../component/topbar/topbar";
import  { FilterFormState } from "../store/filter/filter.slice";
import moment from "moment";
import { missionActions } from "../store/mission/mission.slice";

function toCheckName(rocketName: string, enteredName: string): boolean {
  if (
    rocketName.toLocaleLowerCase().includes(enteredName.toLocaleLowerCase())
  ) {
    return true;
  }
  return false;
}
function toCheckIsSuccess(missonSuccess: boolean, enteredSuccess: string) {
  if (
    enteredSuccess &&
    ((enteredSuccess === "true" && missonSuccess) ||
      (enteredSuccess === "false" && !missonSuccess))
  ) {
    return true;
  }
  return false;
}
function toCheckIsUpcoming(missonUpcoming: boolean, enteredUpcoming: string) {
  if (
    enteredUpcoming &&
    ((enteredUpcoming === "true" && missonUpcoming) ||
      (enteredUpcoming === "false" && !missonUpcoming))
  ) {
    return true;
  }
  return false;
}
function toCheckWeekBefore(missionDateUTC: string) {
  const weekBefore: moment.Moment = moment(moment.utc()).subtract(1, "week");
  const dataMoment: moment.Moment = moment(missionDateUTC);
  if (dataMoment.isSameOrAfter(weekBefore)) {
    return true;
  }
  return false;
}
function toCheckMonthBefore(missionDateUTC: string) {
  const monthBefore: moment.Moment = moment(moment.utc()).subtract(1, "month");
  const dataMoment: moment.Moment = moment(missionDateUTC);
  if (dataMoment.isSameOrAfter(monthBefore)) {
    return true;
  }
  return false;
}
function toCheckYearBefore(missionDateUTC: string) {
  const yearBefore: moment.Moment = moment(moment.utc()).subtract(1, "year");
  const dataMoment: moment.Moment = moment(missionDateUTC);
  if (dataMoment.isSameOrAfter(yearBefore)) {
    return true;
  }
  return false;
}

const HomePage = () => {
  const dispatch = useAppDispatch();
  let missions = useAppSelector((state) => state.mission.missions);
  const filters: FilterFormState = useAppSelector((state) => state.filter);
  const originalMissions:Mission[] = useAppSelector((state)=> state.mission.originalMissions);
  const initialRender = useRef(true);
  useEffect(() => {
    dispatch(fetchMission());
  }, [dispatch]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const filteredMissions: Mission[] = originalMissions.filter((val: Mission) => {
      let toReturn: boolean = false;
      if (
        filters.searchText === "" &&
        filters.isSuccess === "" &&
        filters.timeFilter === "" &&
        filters.isUpcoming === ""
      ) {
        return true;
      } else {
        if (
          (!filters.searchText ||
            (filters.searchText &&
              toCheckName(val.rocket.rocketName, filters.searchText))) &&
          (!filters.timeFilter ||
            (filters.timeFilter &&
              filters.timeFilter === "lastWeek" &&
              toCheckWeekBefore(val.launchDateUTC)) ||
            (filters.timeFilter === "lastMonth" &&
              toCheckMonthBefore(val.launchDateUTC)) ||
            (filters.timeFilter === "lastYear" &&
              toCheckYearBefore(val.launchDateUTC))) &&
          (!filters.isSuccess ||
            (filters.isSuccess &&
              toCheckIsSuccess(val.launchSuccess, filters.isSuccess))) &&
          (!filters.isUpcoming ||
            (filters.isUpcoming &&
              toCheckIsUpcoming(val.upcoming, filters.isUpcoming)))
        ) {
          toReturn = true;
        }
      }
      return toReturn;
    });
    dispatch(missionActions.replaceMissions(filteredMissions));
  }, [filters,dispatch,originalMissions]);

  const renderItems = (): any => {
    return missions.map((val: Mission, index) => {
        return (
          <Grid item md={4} key={index}>
            <MissionCard missionData={val} key={index} />
          </Grid>
        );
    });
  };

  return (
    <div className={styles.homePageContainer}>
      <header>
        <TopBar />
      </header>
      <main>
        <Grid sx={{ boxSizing: "border-box" }} container spacing={1}>
          {renderItems()}
        </Grid>
      </main>
    </div>
  );
};

export default HomePage;
