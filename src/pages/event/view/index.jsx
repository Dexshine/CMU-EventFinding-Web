import React, { useCallback, useEffect, useMemo, useState } from "react";
import MainCard from "../../../components/MainCard";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getEvent } from "../../../api/event";
import { toDate } from "../../../utils/function/date";
import ImagesLightbox from "./ImagesLightbox";
import useAuth from "../../../hooks/useAuth";
import { createRequest, getRequests, patchRequest } from "../../../api/request";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import Flex from "../../../components/Flex";
import {
  BorderColor,
  CalendarMonth,
  Check,
  ContactPage,
  Email,
  EmojiPeople,
  Favorite,
  FavoriteBorder,
  Flag,
  FmdGood,
  Phone,
} from "@mui/icons-material";
import Ratings from "./Ratings";

const EventViewPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [interested, setInterested] = useState(0);
  const [ratingEvents, setRatingtEvents] = useState({
    content: 0,
    date_time: 0,
    location: 0,
    staff: 0,
  });

  // console.log("RatingtEvents", RatingtEvents);

  const isPassed = useMemo(() => {
    return new Date(event?.end_date).getTime() < new Date().getTime();
  }, [event]);

  const theme = useTheme();

  const onHandleInterested = async () => {
    try {
      setLoading(true);
      if (!user) {
        alert("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      if (!id) {
        alert("ไม่พบ ID ของกิจกรรม");
        return;
      }

      if (request) {
        const dataEdit = {
          status: request?.status === "join" ? "cancel" : "join",
        };

        await patchRequest(user._id, id, dataEdit);
      } else {
        const dataCreate = {
          event_id: id,
          user_id: user._id,
          status: "join",
        };

        await createRequest(dataCreate);
      }

      await getData();
      toast.success("บันทึกสำเร็จ");
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const getData = useCallback(async () => {
    try {
      const response = await getEvent(id);
      const respReq = await getRequests({
        // userId: user?._id,
        eventId: id,
      });

      const byUser = respReq?.data?.find((item) => item?.user_id === user?._id);

      const filterJoin = respReq?.data.filter((item) => item.status === "join");

      const count = filterJoin?.length;

      const ratingPoints = filterJoin
        ?.map((item) => item?.rating)
        .filter((el) => el);

      const rating = ratingPoints?.reduce(
        (acc, item) => {
          return {
            content: acc?.content + item?.content,
            date_time: acc?.date_time + item?.date_time,
            location: acc?.location + item?.location,
            staff: acc?.staff + item?.staff,
          };
        },
        {
          content: 0,
          date_time: 0,
          location: 0,
          staff: 0,
        }
      );

      const ratingCount = ratingPoints?.length || 1;

      const avgRating = {
        content: rating.content / ratingCount,
        date_time: rating.date_time / ratingCount,
        location: rating.location / ratingCount,
        staff: rating.staff / ratingCount,
      };

      setRatingtEvents(avgRating);
      setInterested(count || 0);

      if (byUser) {
        setRequest(byUser);
      } else {
        setRequest(null);
      }

      setEvent(response.data);
    } catch (error) {
      console.warn(error);
    } finally {
    }
  }, [setEvent, setRequest, user, id]);

  useEffect(() => {
    const init = async () => {
      setFetching(true);
      await getData();
      setFetching(false);
    };

    init();
  }, [getData]);

  const displayContent = (
    <Box>
      <ImagesLightbox images={event?.images ?? []} />
      <Box>
        <Stack spacing={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex>
              <Typography variant="h3">{event?.title}</Typography>

              {!!event?.is_from_corp && (
                <Chip
                  icon={<Check />}
                  size="medium"
                  label="จัดทำโดยหน่วยงาน / คณะ"
                  color="info"
                  variant="outlined"
                />
              )}
            </Flex>

            <Flex gap={1}>
              {request?.status === "join" && !request?.rating && isPassed && (
                <Ratings eventId={id} isShowPopper callback={() => getData()} />
              )}
              <IconButton
                disabled={isPassed}
                onClick={onHandleInterested}
                sx={{
                  padding: 0,
                }}
              >
                {request?.status === "join" ? (
                  <Favorite color="error" fontSize="large" />
                ) : (
                  <FavoriteBorder color="default" fontSize="large" />
                )}
              </IconButton>
              <Typography variant="h6" color="error">
                {interested ?? 0}
              </Typography>
            </Flex>
          </Box>

          <Flex justifyContent="space-between" flexWrap="wrap">
            <Flex>
              <Flex>
                <FmdGood color="error" />{" "}
                <Typography variant="body1">{event?.location}</Typography>
              </Flex>
              |
              <Flex>
                <EmojiPeople color="info" />{" "}
                <Typography variant="body1">
                  คณะของผู้เข้าร่วม {event?.faculties.join(", ")}
                </Typography>
              </Flex>
            </Flex>

            <Flex>
              <Typography variant="body1"> สร้างโดย</Typography>

              <Avatar src={event?.user?.picture} />
              <Typography variant="body1">{event?.user?.name}</Typography>
            </Flex>
          </Flex>

          <Box display="flex" gap={2}>
            {event?.tags.map((tag) => {
              return (
                <Chip
                  key={tag}
                  label={tag}
                  variant="outlined"
                  color="primary"
                />
              );
            })}
          </Box>

          <Divider
            sx={{
              my: 4,
              borderStyle: "dashed",
            }}
          />

          <Box
            sx={{
              display: "grid",
              gridGap: "20px",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
            }}
          >
            <LabelText
              label="วันจัดกิจกรรม"
              value={`${toDate(event?.start_date)} - ${toDate(event?.end_date)}`}
              Icon={CalendarMonth}
            />
            <LabelText
              label="เบอร์โทร"
              value={event?.phone || "ไม่ระบุ"}
              Icon={Phone}
            />
            <LabelText
              label="อีเมล"
              value={event?.email || "ไม่ระบุ"}
              Icon={Email}
            />
            <LabelText
              label="ช่องทางติดต่ออื่น ๆ"
              value={event?.other_contact || "ไม่ระบุ"}
              Icon={ContactPage}
            />
          </Box>

          <Divider
            sx={{
              my: 4,
              borderStyle: "dashed",
            }}
          />

          <Box p={2}>
            <Typography variant="h4">รายละเอียด</Typography>
            <div dangerouslySetInnerHTML={{ __html: event?.detail }} />
          </Box>

          <Box>
            {isPassed && (
              <Stack spacing={2}>
                <Divider
                  sx={{
                    my: 4,
                    borderStyle: "dashed",
                  }}
                />
                <Flex>
                  <Typography component="legend" sx={{ width: "100px" }}>
                    เนื้อหา
                  </Typography>
                  <Rating
                    value={ratingEvents?.content}
                    readOnly
                    precision={0.5}
                  />
                  <Typography component="caption">
                    {ratingEvents?.content}
                  </Typography>
                </Flex>
                <Flex>
                  <Typography component="legend" sx={{ width: "100px" }}>
                    วันเวลา
                  </Typography>
                  <Rating
                    value={ratingEvents?.date_time}
                    readOnly
                    precision={0.5}
                  />
                  <Typography component="caption">
                    {ratingEvents?.date_time}
                  </Typography>
                </Flex>
                <Flex>
                  <Typography component="legend" sx={{ width: "100px" }}>
                    สถานที่
                  </Typography>
                  <Rating
                    value={ratingEvents?.location}
                    readOnly
                    precision={0.5}
                  />
                  <Typography component="caption">
                    {ratingEvents?.location}
                  </Typography>
                </Flex>
                <Flex>
                  <Typography component="legend" sx={{ width: "100px" }}>
                    ทีมงาน
                  </Typography>
                  <Rating
                    value={ratingEvents?.staff}
                    readOnly
                    precision={0.5}
                  />
                  <Typography component="caption">
                    {ratingEvents?.staff}
                  </Typography>
                </Flex>
              </Stack>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  const displayLoading = (
    <Box
      height={400}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width={300}>
        <LinearProgress />
      </Box>
    </Box>
  );

  return (
    <MainCard>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mb={2}
        p={2}
        sx={{
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Typography variant="h4">ข้อมูลกิจกรรม</Typography>
      </Box>

      {fetching ? displayLoading : displayContent}
    </MainCard>
  );
};

export default EventViewPage;

const LabelText = ({ label, value, Icon }) => {
  return (
    <Flex alignItems="start" justifyContent="center">
      <Icon />
      <Box width={300}>
        <Typography variant="body1" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="body2">{value}</Typography>
      </Box>
    </Flex>
  );
};
