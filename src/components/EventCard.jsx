import { People } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { toDate } from "../utils/function/date";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const EventCard = ({ title, id, tags = [], image, qty, date }) => {
  const theme = useTheme();
  const naigate = useNavigate();

  const startDate = dayjs(); // Assuming start_date is the current date

  return (
    <Card
      sx={{
        width: "260px",
        borderRadius: theme.shape.borderRadius,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.primary.main,
      }}
      onClick={() => naigate(`/event/${id}`)}
    >
      <CardActionArea sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: "4px",
            fontSize: "10px",
            borderRadius: "0 0 0 8px",
          }}
        >
          จะเริ่มใน {dayjs(date).diff(startDate, "day")} วัน
        </Box>
        <CardMedia component="img" height="140px" image={image} alt={title} />
        <CardContent sx={{ paddingTop: "5px" }}>
          <Typography
            variant="h6"
            color="primary"
            fontWeight={400}
            height={40}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            Tags : {tags.join(", ")}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={1}
            sx={{ mt: 1 }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <People fontSize="small" />
              <Typography variant="caption" color="text.secondary">
                {qty}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              วันที่เริ่ม : {toDate(date, "DD MMM BB")}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
