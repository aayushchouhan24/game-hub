import useGenres from "./useGenres";

const useGenre = (id: number | undefined) => {
  const { data } = useGenres();
  return data?.results.find((r) => r.id === id);
};

export default useGenre;
