import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import Ratings from "../event/view/Ratings";
import { CardActions, IconButton, Rating, Stack } from "@mui/material";
import Flex from "../../components/Flex";
import { createRequest, patchRequest } from "../../api/review";
import toast from "react-hot-toast";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { CANCEL, INTERESTED } from "../../assets/status";

export default function ReviewCard({ imagePath, title, event, review }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const propsData = {
    ...event,
    end_date: event?.end_date,
  };

  const isPassed = useMemo(() => {
    return new Date(propsData?.end_date).getTime() < new Date().getTime();
  }, [propsData]);

  const onHandleInterested = async () => {
    try {
      setLoading(true);
      if (!user) {
        alert("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      if (!event.id) {
        alert("ไม่พบ ID ของกิจกรรม");
        return;
      }

      if (review) {
        const dataEdit = {
          status: review?.status === INTERESTED ? CANCEL : INTERESTED,
        };

        await patchRequest(user._id, event.id, dataEdit);
      } else {
        const dataCreate = {
          event_id: event.id,
          user_id: user._id,
          status: INTERESTED,
        };

        await createRequest(dataCreate);
      }

      // await getData();
      toast.success("บันทึกสำเร็จ");

      navigate(0);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const displayRatings = (
    <Stack spacing={1}>
      <Flex>
        <Typography component="legend" sx={{ width: "100px" }}>
          เนื้อหา
        </Typography>
        <Rating value={review?.rating?.content} readOnly precision={0.5} />
        <Typography component="caption">{review?.rating?.content}</Typography>
      </Flex>
      <Flex>
        <Typography component="legend" sx={{ width: "100px" }}>
          วันเวลา
        </Typography>
        <Rating value={review?.rating?.date_time} readOnly precision={0.5} />
        <Typography component="caption">{review?.rating?.date_time}</Typography>
      </Flex>
      <Flex>
        <Typography component="legend" sx={{ width: "100px" }}>
          สถานที่
        </Typography>
        <Rating value={review?.rating?.location} readOnly precision={0.5} />
        <Typography component="caption">{review?.rating?.location}</Typography>
      </Flex>
      <Flex>
        <Typography component="legend" sx={{ width: "100px" }}>
          ทีมงาน
        </Typography>
        <Rating value={review?.rating?.staff} readOnly precision={0.5} />
        <Typography component="caption">{review?.rating?.staff}</Typography>
      </Flex>
    </Stack>
  );

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        // maxWidth: "450px",
        height: "200px",
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151, cursor: "pointer" }}
        image={imagePath}
        alt={title}
        onClick={() => navigate(`/event/${event.id}`)}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="h5"
            gutterBottom
            onClick={() => navigate(`/event/${event.id}`)}
            sx={{
              cursor: "pointer",
            }}
          >
            {title}
          </Typography>

          {isPassed && displayRatings}
        </CardContent>
        <CardActions>
          {isPassed && <Ratings eventId={event.id} isShowPopper={false} />}

          <IconButton
            disabled={isPassed}
            onClick={onHandleInterested}
            sx={{
              padding: 0,
            }}
          >
            {review?.status === INTERESTED ? (
              <Favorite color="error" fontSize="large" />
            ) : (
              <FavoriteBorder color="default" fontSize="large" />
            )}
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
}
