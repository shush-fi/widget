import { intervalToDuration } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";

export const Timer = ({
  deadline,
  className,
}: {
  deadline: Date;
  className?: string;
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const getTime = useCallback(() => {
    setCurrentTime(() => new Date());
  }, [setCurrentTime]);

  useEffect(() => {
    const intervalId = setInterval(getTime, 1000);
    return () => clearInterval(intervalId);
  }, [getTime]);

  useEffect(() => {
    setCurrentTime(() => new Date());
  }, [deadline]);

  const formattedTimer = useMemo(() => {
    const duration = intervalToDuration({
      start: currentTime,
      end: deadline.getTime(),
    });

    const values = [duration.hours, duration.minutes, duration.seconds];
    const formatted = values
      .filter(
        (value, i) => Boolean(value) || values.findIndex((v) => v && v > 0) < i
      )
      .map((num) => (num ? String(num).padStart(2, "0") : "00"))
      .join(":");

    return formatted;
  }, [currentTime, deadline]);

  return <span className={className}>{formattedTimer}</span>;
};
