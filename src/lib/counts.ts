export const counts = [10, 100, 1000, 10_000] as const;

export const getStaticPaths = () =>
  counts.map((count) => ({ params: { count } }));
