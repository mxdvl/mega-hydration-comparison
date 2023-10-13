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

export const duration = ({
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

export const timeAgo = ({
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
