import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { getRequestsByUser } from "../../api/request";
import useAuth from "../../hooks/useAuth";
import Flex from "../../components/Flex";
import { generateImageUrl } from "../../utils/function/global";
import { getEventsByUser } from "../../api/event";
import EventCard from "../../components/EventCard";

const ReviewPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  const getData = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      const response = await getRequestsByUser(user._id);

      const filterJoin = response.data.filter((item) => item.status === "join");

      setReviews(filterJoin);
    } catch (error) {
      console.warn(error);
    }
  }, [user]);

  const getMyEvents = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      const response = await getEventsByUser(user._id);

      setMyEvents(response.data);
    } catch (error) {
      console.warn(error);
    }
  }, [user]);

  console.log("myEvents", myEvents);

  useEffect(() => {
    getMyEvents();
  }, [getMyEvents]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          กิจกรรมที่เข้าร่วม
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gridGap: "20px",
          }}
        >
          {reviews.map((review) => {
            return (
              <ReviewCard
                review={review}
                event={review?.event}
                imagePath={generateImageUrl(review?.event?.images[0])}
                title={review?.event?.title}
              />
            );
          })}
        </Box>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          กิจกรรมที่สร้าง
        </Typography>

        <Flex>
          {myEvents ? (
            myEvents.map((event) => (
              <Box key={event.id}>
                <EventCard
                  id={event.id}
                  title={event.title}
                  image={event.images[0]}
                  tags={event.tags}
                  qty={event.interested_qty}
                  date={event.start_date}
                />
              </Box>
            ))
          ) : (
            <Box height={200} width={260}>
              <Typography variant="h6" color="textSecondary">
                ไม่มีกิจกรรม
              </Typography>
            </Box>
          )}
        </Flex>
      </Box>
    </Stack>
  );
};

export default ReviewPage;

