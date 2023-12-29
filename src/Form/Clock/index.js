import { Wrapper } from "./styled";
import { useCurrentDate } from "./useCurrentDate";

const clockFormat = (date) =>
  date.toLocaleString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const Clock = () => {
  const date = useCurrentDate();

  return <Wrapper>Today is {clockFormat(date)}</Wrapper>;
};
