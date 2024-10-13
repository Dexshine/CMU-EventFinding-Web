import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import EventCard from "../../components/EventCard";

const EventContainer = ({ title, events, loading }) => {
  // const theme = useTheme();

  const displayLoadings = (
    <Box>
      <Skeleton variant="rounded" width={260} height={140} />
      <Skeleton variant="text" height={40} sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" height={40} sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" height={40} sx={{ fontSize: "1rem" }} />
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <Typography variant="h3" style={{ color: "#6B69B1" }}>
          |
        </Typography>
        <Typography variant="h4">{title}</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {loading && displayLoadings}
        {events ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              image={event.images[0]}
              tags={event.tags}
              qty={event.interested_qty}
              date={event.start_date}
            />
          ))
        ) : (
          <Box height={200} width={260}>
            <Typography variant="h6" color="textSecondary">
              ไม่มีกิจกรรม
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EventContainer;
