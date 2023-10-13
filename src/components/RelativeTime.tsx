import { useEffect, useState } from "preact/hooks";
import { duration, timeAgo } from "../lib/timeAgo";
// import { useIsInView } from "../lib/useIsInView";

type Props = {
  /** the time to compare with in milliseconds since epoch */
  then: number;
  /** required to ensure that there is no mismatch between server and client */
  now: number;
};

export const RelativeTime = ({ now, then }: Props) => {
  const { length, unit } = duration({ then, now });

  //   const [inView, ref] = useIsInView({ repeat: true });
  const [time, setTime] = useState(now);

  const [display, setDisplay] = useState(
    timeAgo({ length, unit, date: new Date(then) })
  );

  useEffect(() => {
    setTime(Date.now());
  }, []);

  useEffect(() => {
    // if (!inView) return;
    const newTime = duration({
      then,
      now: time,
    });

    setDisplay(timeAgo({ ...newTime, date: new Date(then) }));

    const timeout = setTimeout(
      () => {
        setTime(Date.now());
      },
      // Math.max(units[newTime.unit], 1_000)
      1_000
    );
    return () => clearTimeout(timeout);
  }, [
    then,
    time,
    // inView
  ]);

  const date = new Date(then);

  return (
    <time
      //   ref={ref}
      dateTime={date.toISOString()}
      title={date.toLocaleDateString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZoneName: "long",
      })}
    >
      {display}
    </time>
  );
};
