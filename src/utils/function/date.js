import dayjs from "dayjs";

export const toDate = (date, format = "DD MMM BBBB HH:mm") => {
  return dayjs(date).format(format);
};
