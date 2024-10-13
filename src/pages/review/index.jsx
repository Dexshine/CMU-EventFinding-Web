import { Box, Card, CardContent } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { getRequestsByUser } from "../../api/request";
import useAuth from "../../hooks/useAuth";
import Flex from "../../components/Flex";
import { generateImageUrl } from "../../utils/function/global";

const ReviewPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

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

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Box>
      {/* <Flex> */}

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
        })}{" "}
      </Box>
      {/* </Flex> */}
    </Box>
  );
};

export default ReviewPage;
