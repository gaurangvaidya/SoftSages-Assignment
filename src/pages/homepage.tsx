import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMission } from "../store/mission/mission.actions";
import { Box } from "@mui/system";
import { Container, Grid } from "@mui/material";
import { Mission } from "../constants/mission.model";
import MissionCard from "../component/missioncard/missoncard";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector((state) => state.mission.missions);

  useEffect(() => {
    dispatch(fetchMission());
  }, [dispatch]);

  const renderItems = (): any => {
    return missions.map((val: Mission, index) => {
      if (index < 10) {
        return (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <MissionCard missionData={val} key={index} />
          </Grid>
        );
      }
    });
  };

  return (
    <Container
      sx={{paddingTop:"1rem"}}
    >
      <Grid
        container
        spacing={{ xs: 3, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderItems()}
      </Grid>
    </Container>
  );
};
export default HomePage;
