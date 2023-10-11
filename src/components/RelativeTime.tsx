import { useEffect, useState } from "preact/hooks";
// import { useIsInView } from "../lib/useIsInView";

type Props = {
  /** the time to compare with in milliseconds since epoch */
  then: number;
  /** required to ensure that there is no mismatch between server and client */
  now: number;
};

const units = {
  second: 1_000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
} as const satisfies Record<string, number>;

const duration = ({
  then,
  now,
}: Props): { length: number; unit: keyof typeof units } => {
  const difference = now - then;
  if (difference < units.minute) {
    return { length: difference / units.second, unit: "second" };
  }
  if (difference < units.hour) {
    return { length: difference / units.minute, unit: "minute" };
  }
  if (difference < units.day) {
    return { length: difference / units.hour, unit: "hour" };
  }
  return { length: difference / units.day, unit: "day" };
};

const timeAgo = ({
  length,
  unit,
  date,
}: {
  date: Date;
  length: number;
  unit: keyof typeof units;
}) => {
  if (unit === "day" && length > 7) {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  if (unit === "second" && length < 15) return "now";
  return `${Math.floor(length)}${unit.charAt(0)} ago`;
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
