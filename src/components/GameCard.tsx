import { Badge, Card, CardBody, HStack, Heading, Text } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import { Link } from "react-router-dom";
import Game from "../entities/Game";
import { FaPlus } from "react-icons/fa";
import GamePreview from "./GamePreview";
import Wished from "./Wished";
import AddToCart from "./AddToCart";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card
      userSelect={"none"}
      height={310}
      width="300px"
      borderRadius={10}
      overflow={"hidden"}
    >
      <Link to={`/game/${game.slug}`}>
        <GamePreview game={game} />
      </Link>
      <CardBody>
        <Link to={`/game/${game.slug}`}>
          <HStack justifyContent={"space-between"}>
            <PlatformIconList
              platforms={game.parent_platforms.map((p) => p.platform)}
            ></PlatformIconList>
            <CriticScore score={game.metacritic}></CriticScore>
          </HStack>
          <HStack>
            <Heading
              marginY={2}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              fontSize="xl"
            >
              {game.name}
            </Heading>
            <Emoji rating={game.rating_top} />
          </HStack>
        </Link>
        <HStack justifyContent={"space-between"} marginY={2}>
          <HStack>
            <Badge borderRadius={5}>
              <HStack padding={1}>
                <FaPlus fontSize={15} />
                <Text> {game.added} </Text>
              </HStack>
            </Badge>
            <AddToCart game={game} />
          </HStack>
          <Wished gameId={game.id} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
