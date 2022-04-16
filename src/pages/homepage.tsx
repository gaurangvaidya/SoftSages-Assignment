import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMission } from "../store/mission/mission.actions";
import { Container, Grid } from "@mui/material";
import { Mission } from "../constants/mission.model";
import MissionCard from "../component/missioncard/missoncard";
import styles from "./homepage.module.css";
import TopBar from "../component/appbar/topbar";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector((state) => state.mission.missions);

  useEffect(() => {
    dispatch(fetchMission());
  }, [dispatch]);

  const renderItems = (): any => {
    return missions.map((val: Mission, index) => {
      if (index < 9) {
        return (
          <Grid item md={4} key={index}>
            <MissionCard missionData={val} key={index} />
          </Grid>
        );
      }
    });
  };

  return (
    <div className={styles.homePageContainer}>
      <header>
        <TopBar />
      </header>
      <main>
          <Grid sx={{boxSizing:"border-box"}} container  spacing={1}>
            {renderItems()}
          </Grid>
      </main>
    </div>
  );
};

export default HomePage;
