import MainCard from "../../components/MainCard";
import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getRequests } from "../../api/review";
import BarChartComp from "../../components/chart/BarChartComp";
import RadarChartComp from "../../components/chart/RadarChartComp";
import Flex from "../../components/Flex";
import CardStats from "../../components/chart/CardStats";
import { AssignmentInd, Event, Favorite, Group } from "@mui/icons-material";
import TagsRanking from "../../components/chart/TagsRanking";
import EventRanking from "../../components/chart/EventRanking";
import { getUsers } from "../../api/user";
import { getEvents } from "../../api/event";
import { INTERESTED } from "../../assets/status";

const DashboardPage = () => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  const getData = useCallback(async () => {
    try {
      const responseRequest = await getRequests({ status: INTERESTED });
      const responseUser = await getUsers();
      const responseEvent = await getEvents();

      console.log("responseRequest", responseRequest);

      setUsers(responseUser.data);
      setRequests(responseRequest.data);
      setEvents(responseEvent.data);
    } catch (error) {
      console.warn(error);
    }
  }, [setRequests]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "20px",
          }}
        >
          <CardStats
            label="จำนวนผู้ใช้งาน"
            value={users.length}
            icon={<Group color="info" fontSize="large" />}
          />
          <CardStats
            label="จำนวนกิจกรรม"
            value={events.length}
            icon={<AssignmentInd color="warning" fontSize="large" />}
          />
          <CardStats
            label="การกดสนใจกิจกรรม"
            value={requests.length}
            icon={<Favorite color="error" fontSize="large" />}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: "20px",
          }}
        >
          <MainCard>
            <Typography>แท็กยอดนิยม</Typography>
            <TagsRanking events={requests.map((re) => re.event)} />
          </MainCard>
          <MainCard>
            <Typography>กิจกรรมยอดนิยม</Typography>
            <EventRanking events={requests.map((re) => re.event)} />
          </MainCard>
        </Box>

        {/* <MainCard>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: "20px",
            }}
          >
            <BarChartComp title="จำนวนกิจกรรม" data={[2, 4, 5, 2, 1]} />
            <BarChartComp
              title="แท็กยอดนิยม"
              data={[10, 4, 7, 8, 9]}
              color="#EBD82D"
            />
            <BarChartComp title="TOP 10 ที่คนสนใจ" data={[2, 4, 5, 7, 5, 7]} />

            <BarChartComp
              title="Top 10 กิจกรรมที่ได้คะแนนสูงสุด"
              data={[2, 4, 5, 2, 1]}
            />
            <BarChartComp
              title="จำนวนกิจกรรมของแต่ละวันในสัปดาห์"
              data={[10, 4, 7, 8, 9, 2, 3]}
              color="#EBD82D"
            />
            <BarChartComp
              title="ช่วงเวลาของวันที่มีกิจกรรมมากที่สุด"
              data={[10, 4, 7, 8, 9, 2, 3]}
              color="#EBD82D"
            />
          </Box>
        </MainCard> */}
        {/* <MainCard>
          <Typography variant="body1" gutterBottom>
            ผลประเมินควาสนใจ
          </Typography>

          <Box
            width={{
              xs: "100%",
              md: "50%",
            }}
            margin="auto"
          >
            <RadarChartComp />
          </Box>
        </MainCard> */}
      </Stack>
    </>
  );
};

export default DashboardPage;
