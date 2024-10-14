import {
  Cancel,
  Delete,
  People,
  Remove,
  RemoveCircle,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { toDate } from "../utils/function/date";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { updateEvent } from "../api/event";
import toast from "react-hot-toast";
const EventCard = ({
  title,
  id,
  tags = [],
  image,
  qty,
  date,
  end_date,
  isCanCancel = false,
  status,
}) => {
  const theme = useTheme();
  const naigate = useNavigate();

  const startDate = dayjs();

  const handleCancel = async (ev) => {
    toast((t) => {
      console.log("t", t);

      return (
        <Stack spacing={2}>
          <Typography variant="body1" fontSize="20px">
            คุณแน่ใจหรือไม่ที่จะยกเลิกกิจกรรมนี้
          </Typography>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={async () => {
                try {
                  await updateEvent(id, { status: "cancel" });

                  toast.success("Cancel event success");
                } catch (error) {
                  toast.error("Cancel event failed");
                } finally {
                  toast.dismiss(t.id);
                }
              }}
            >
              Confirm
            </Button>
          </Box>
        </Stack>
      );
    });

    ev.stopPropagation();
  };

  return (
    <Card
      sx={{
        width: "260px",
        borderRadius: theme.shape.borderRadius,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.primary.main,
        // position: "relative",
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
          {dayjs(end_date).isBefore(startDate) ? (
            <>จบไปแล้ว</>
          ) : dayjs(date).isAfter(startDate) ? (
            <>จะเริ่มใน {dayjs(date).diff(startDate, "day")} วัน</>
          ) : (
            <>เริ่มไปแล้ว</>
          )}
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
      <CardActions
        sx={{
          justifyContent: "flex-end",
          p: 0,
        }}
      >
        {isCanCancel && status !== "cancel" && (
          <IconButton
            sx={{
              zIndex: 100,
            }}
            size="small"
          >
            <Delete color="error" onClick={handleCancel} />
          </IconButton>
        )}{" "}
        {status === "cancel" && (
          <Chip
            color="error"
            label="ยกเลิกแล้ว"
            size="small"
            sx={{ m: "6px" }}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default EventCard;
