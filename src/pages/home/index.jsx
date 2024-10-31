import { Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { getEvents } from "../../api/event";
import { getRequests } from "../../api/review";
import { INTERESTED, PUBLISH } from "../../assets/status";
import useAuth from "../../hooks/useAuth";
import EventContainer from "../../sections/event-container";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [sortEvents, setSortEvents] = useState([]);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      const respReq = await getRequests({});

      const filterPublish = response.data.filter(
        (res) => res.status === PUBLISH
      );

      const mapInterest = filterPublish.map((event) => {
        const interested = respReq.data.filter(
          (req) => req.event_id === event.id && req.status === INTERESTED
        );
        return {
          ...event,
          interested_qty: interested.length,
        };
      });

      const sortInterest = [...mapInterest].sort(
        (a, b) => b.interested_qty - a.interested_qty
      );

      const mapInterestingPoint = [...mapInterest]
        .map((ev) => {
          let point = 0;

          if (user && user.interests.length) {
            ev.tags.forEach((tag) => {
              if (user?.interests[0] === tag) {
                point += 3;
              }

              if (user?.interests[1] === tag) {
                point += 2;
              }

              if (user?.interests[2] === tag) {
                point += 1;
              }
            });
          }

          return {
            ...ev,
            interesting_point: point,
          };
        })
        .filter((item) => item.interesting_point > 0)
        .sort((a, b) => b.interesting_point - a.interesting_point);

      setEvents(mapInterest);
      setSortEvents(sortInterest);

      setRelatedEvents(mapInterestingPoint);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [setEvents]);

  useEffect(() => {
    getData();
  }, [getData]);

  const filterNotOver = (eventsArr) => {
    return [...eventsArr].filter(
      (el) => new Date().getTime() <= new Date(el.end_date).getTime()
    );
  };

  return (
    <>
      <Stack spacing={4}>
        <EventContainer
          title="กิจกรรมที่ช่วงนี้ผู้คนสนใจ"
          events={filterNotOver(sortEvents).slice(0, 4)}
          loading={loading}
        />
        <EventContainer
          title={`กิจกรรมสำหรับคุณ ${user?.interests?.length ? `(${user?.interests.join(", ")})` : ""} `}
          events={filterNotOver(relatedEvents).slice(0, 4)}
          loading={loading}
        />
        <EventContainer
          title="กิจกรรมจากหน่วยงาน / คณะ"
          events={filterNotOver(events).filter(
            (event) => !!event?.is_from_corp
          )}
          loading={loading}
        />
        <EventContainer
          title="กิจกรรมทั้งหมด"
          events={events}
          loading={loading}
          showToolbar
        />
      </Stack>
    </>
  );
};

export default HomePage;

