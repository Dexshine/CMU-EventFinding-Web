import { Box, Stack } from "@mui/material";
import React, { useCallback } from "react";
import EventContainer from "../../sections/event-container";
import { MOCK_EVENTS } from "../../mock/_events";
import { getEvents } from "../../api/event";

const EventPage = () => {
  const getData = useCallback(async () => {
    try {
      const response = await getEvents();
      console.log(response);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  return (
    <Stack spacing={4}>
      <EventContainer title="กิจกรรมทั้งหมด" events={MOCK_EVENTS} />
    </Stack>
  );
};

export default EventPage;
