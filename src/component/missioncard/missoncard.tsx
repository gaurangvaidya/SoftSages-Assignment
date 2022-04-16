import React from "react";
import { Mission } from "../../constants/mission.model";
import { Card } from "@mui/material";
import { CardContent, Typography,CardMedia } from "@mui/material";

export interface MissonCardProps {
  missionData: Mission;
}

const MissionCard: React.FC<MissonCardProps> = ({ missionData }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <CardMedia
        component="img"
        height="140"
        image={missionData.missionPatch}
        alt={`Mission Patch for ${missionData.missionName}`}
      />
        <Typography variant="h5" component="div">
            {missionData.missionName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MissionCard;
