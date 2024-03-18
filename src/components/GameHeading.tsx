import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";

interface Prop {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Prop) => {
  return (
    <Heading marginY={5} fontSize='5xl' as={"h1"}>
      {`${gameQuery.platform?.name || ""} ${
        gameQuery.genre?.name || "All"
      } Games`}
    </Heading>
  );
};

export default GameHeading;
