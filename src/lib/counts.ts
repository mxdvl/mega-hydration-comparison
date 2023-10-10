export const counts = [1, 30, 100, 300, 1000, 3_000, 10_000] as const;

export const getStaticPaths = () =>
  counts.map((count) => ({ params: { count } }));
