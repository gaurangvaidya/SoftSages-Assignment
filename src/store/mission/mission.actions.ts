import { AppDispatch } from "./../store.index";
import { Mission } from "./../../constants/mission.model";
import axios from "axios";
import { missionActions } from "./mission.slice";
import * as _ from "lodash";

const mapResponseToMissions = (res: any): Mission[] => {
  let missions: Mission[] = [];
  missions = _.map(res?.data,(val: any) => {
    let mission: Mission = {
      flightNumber: val?.flight_number || 0,
      missionName: val?.mission_name || "",
      launchDateUnix: val?.launch_date_unix || 0,
      launchDateUTC: val?.launch_date_utc || "",
      launchDateLocale: val?.launch_date_local || "",
      upcoming: val?.upcoming,
      rocket: {
        rocketId: val?.rocket?.rocket_id || "",
        rocketName: val?.rocket?.rocket_name || "",
        rocketType: val?.rocket?.rocket_type || "",
      },
      missionPatch: val?.links?.mission_patch || "",
      launchYear: val?.launch_year || 0,
      launchSuccess:val?.launch_success
    };
    return mission;
  });
  return missions;
};

export const fetchMission = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let missions: Mission[] = [];
      const response: any = await axios.get(
        "https://api.spacexdata.com/v3/launches"
      );
      if (response && response.data) {
        missions = mapResponseToMissions(response);
        dispatch(missionActions.replaceMissions(missions));
      }
    } catch (error: any) {
      console.log(error);
    }
  };
};
