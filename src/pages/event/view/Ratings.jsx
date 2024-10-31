import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Rating from "@mui/material/Rating";
import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { Star } from "@mui/icons-material";
import { patchRequest } from "../../../api/review";
import toast from "react-hot-toast";

const lists = [
  {
    label: "เนื้อหา",
    value: "rating.content",
  },
  {
    label: "เวลา",
    value: "rating.date_time",
  },
  {
    label: "สถานที่",
    value: "rating.location",
  },
  {
    label: "ทีมงาน",
    value: "rating.staff",
  },
];

const Ratings = ({ eventId, isShowPopper, callback }) => {
  const { user } = useAuth();

  const id = eventId;
  // const { id } = useParams();
  const { control, handleSubmit } = useForm();
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      const payload = {
        rating: {
          content: data?.rating?.content,
          date_time: data?.rating?.date_time,
          location: data?.rating?.location,
          staff: data?.rating?.staff,
        },
      };

      await patchRequest(user._id, id, payload);

      toast.success("บันทึกคะแนนสำเร็จ");
      setDialogOpen(false);

      if (callback) {
        callback();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <Box position="relative">
        {isShowPopper && (
          <Paper
            elevation={8}
            sx={{
              position: "absolute",
              top: "-30px",
              right: "30px",
              zIndex: 99,
            }}
          >
            <Badge variant="dot" invisible={false} color="error">
              <Typography fontSize="20px" sx={{ p: 1 }} whiteSpace="nowrap">
                กรุณาให้คะแนน
              </Typography>
            </Badge>
          </Paper>
        )}

        <IconButton onClick={() => setDialogOpen(true)}>
          <Star color="warning" fontSize="large" />
        </IconButton>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <Stack spacing={2} justifyContent="center">
            {lists.map((list) => {
              return (
                <Box>
                  <Typography component="legend">{list.label}</Typography>
                  <Controller
                    name={list.value}
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <Rating
                        {...field}
                        onChange={(_, value) => field.onChange(value)}
                        value={field.value}
                      />
                    )}
                  />
                </Box>
              );
            })}

            <Button onClick={handleSubmit(onSubmit)}>บันทึก</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Ratings;
