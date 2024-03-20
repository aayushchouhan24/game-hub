import { Heading } from "@chakra-ui/react";
import usePlatform from "../hooks/usePlatform";
import useGenre from "../hooks/useGenre";
import useGameQueryStore from "../store";

const GameHeading = () => {
  const [genreId, platformId] = useGameQueryStore((s) => [
    s.gameQuery.genreId,
    s.gameQuery.platformId,
  ]);

  const platform = usePlatform(platformId);
  const genre = useGenre(genreId);

  return (
    <Heading marginY={5} fontSize="5xl" as={"h1"}>
      {`${platform?.name || ""} ${genre?.name || ""} Games`}
    </Heading>
  );
};

export default GameHeading;
