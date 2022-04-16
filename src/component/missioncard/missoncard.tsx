import React from "react";
import { Mission } from "../../constants/mission.model";
import { Card, CardHeader } from "@mui/material";
import { CardContent, CardActions, Typography, Button } from "@mui/material";

export interface MissonCardProps {
  missionData: Mission;
}

const MissionCard: React.FC<MissonCardProps> = ({ missionData }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5">
            {missionData.missionName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MissionCard;
