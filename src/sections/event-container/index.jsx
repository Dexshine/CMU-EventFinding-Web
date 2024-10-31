import {
  Box,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import EventCard from "../../components/EventCard";
import { tagOptions } from "../../assets/options";
import { Refresh } from "@mui/icons-material";

const EventContainer = ({ title, events, loading, showToolbar = false }) => {
  const theme = useTheme();
  const [filter, setFilter] = useState({
    search: "",
    tag: "",
  });

  const filterEvents = events?.filter((event) => {
    if (filter.tag) {
      return event.tags.includes(filter.tag);
    }

    if (filter.search) {
      return event.title.toLowerCase().includes(filter.search.toLowerCase());
    }

    return true;
  });

  const displayLoadings = (
    <Box>
      <Skeleton variant="rounded" width={260} height={140} />
      <Skeleton variant="text" height={40} sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" height={40} sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" height={40} sx={{ fontSize: "1rem" }} />
    </Box>
  );

  const displayToolbar = (
    <Box
      mb={2}
      display="flex"
      p={1}
      // bgcolor="white"
      gap={2}
      // sx={{
      //   borderRadius: theme.shape.borderRadius,
      // }}
    >
      <TextField
        label="ค้นหากิจกรรม"
        onChange={(ev) =>
          setFilter((prev) => {
            return {
              ...prev,
              search: ev.target.value,
            };
          })
        }
        value={filter.search}
        variant="outlined"
        sx={{
          width: "300px",
          bgcolor: "white",
        }}
      />

      <FormControl>
        <InputLabel>เลือกแท็ก</InputLabel>
        <Select
          value={filter.tag}
          onChange={(ev) =>
            setFilter((prev) => {
              return { ...prev, tag: ev.target.value };
            })
          }
          sx={{
            bgcolor: "white",
            width: "200px",
          }}
          label="เลือกแท็ก"
        >
          {tagOptions.map((tag) => (
            <MenuItem value={tag.value} key={tag.value}>
              {tag.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton
        onClick={() => {
          setFilter({
            search: "",
            tag: "",
          });
        }}
      >
        <Refresh />
      </IconButton>
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

      {showToolbar && displayToolbar}

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {loading && displayLoadings}
        {filterEvents.length ? (
          filterEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              image={event.images[0] ?? "/assets/images/blank.png"}
              tags={event.tags}
              qty={event.interested_qty}
              date={event.start_date}
              end_date={event.end_date}
              status={event.status}
            />
          ))
        ) : (
          <Box height={200} width={260} display="flex" alignItems="center">
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
