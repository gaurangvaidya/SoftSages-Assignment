import React from "react";
import { Mission } from "../../constants/mission.model";
import { Card } from "@mui/material";
import { CardContent, Typography, CardMedia } from "@mui/material";
import moment from "moment";

export interface MissonCardProps {
  missionData: Mission;
}

const MissionCard: React.FC<MissonCardProps> = ({ missionData }) => {
  return (
    <Card variant="outlined">
      <CardContent sx={{textAlign:"center"}}>
        <CardMedia
          component="img"
          height="140"
          image={missionData.missionPatch}
          alt={`Mission Patch for ${missionData.missionName}`}
        />
        <Typography variant="h5" component="div">
          {missionData.missionName}
        </Typography>
        <Typography>
          Is Upcoming: {missionData.upcoming ? "Yes" : "No"}
        </Typography>
        <Typography>
          Is Success: {missionData.launchSuccess ? "Yes" : "No"}
        </Typography>
        <Typography>
          {"Launch Date: " +
            moment(missionData.launchDateUTC).format("MMM Do YY")}
        </Typography>
        <Typography>
          {"Rocket Name: " + missionData.rocket.rocketName}
        </Typography>
        <Typography>
          {"Rocket Type: " + missionData.rocket.rocketType}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MissionCard;
