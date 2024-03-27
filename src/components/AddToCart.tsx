import { Badge, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { BiCart } from "react-icons/bi";
import useFirebase from "../hooks/useFirebase";
import useUserStore from "../stores/UserStore";
import { useEffect, useState } from "react";
import Game from "../entities/Game";
import useGame from "../hooks/useGame";
import LoginAlert from "./LoginAlert";

const AddToCart = ({ game }: { game: Game }) => {
  const [added, setAdded] = useState(false);
  const user = useUserStore((s) => s.user);
  const { snapshot, addValue } = useFirebase(
    `Users/${user?.uid}/cart/${game.id}`
  );
  const { data: gameData, isLoading } = useGame(game.slug!);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const pub = gameData?.publishers[0];

  const data = {
    id: game.id,
    name: game.name,
    image: game.background_image,
    price: 1,
    publisher: pub ? pub.name : "Unknown",
  };

  useEffect(() => {
    if (!isLoading && snapshot) {
      const data = snapshot.val();
      setAdded(data);
    }
  }, [snapshot]);

  return (
    <Badge colorScheme={snapshot?.val() ? "green" : undefined} borderRadius={5}>
      {!user && <LoginAlert isOpen={isOpen} onClose={onClose} />}
      <HStack
        onClick={() => (user ? addValue(!added ? data : null) : onOpen())}
        _hover={{
          color: snapshot?.val() ? undefined : "white",
          fontWeight: "700",
        }}
        padding={1}
      >
        <BiCart fontSize={15} />
        <Text textTransform={"none"}>
          {snapshot?.val() ? "Added to cart" : "Add to cart"}
        </Text>
      </HStack>
    </Badge>
  );
};
export default AddToCart;
