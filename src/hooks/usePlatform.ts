import usePlatforms from "./usePlatforms";

const usePlatform = (id: number | undefined) => {
  const { data } = usePlatforms();
  return data?.results.find((r) => r.id === id);
};

export default usePlatform;
