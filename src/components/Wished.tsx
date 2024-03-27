import { Box, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import LoginAlert from "./LoginAlert";
import useUserStore from "../stores/UserStore";
import useFirebase from "../hooks/useFirebase";

interface Props {
  gameId: number;
}

const Wished = ({ gameId }: Props) => {
  const [wished, setWished] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = useUserStore((s) => s.user);

  const fontSize = 20;

  const { snapshot, isLoading, addValue } = useFirebase(
    `Users/${user?.uid}/wishlist/${gameId}`
  );

  useEffect(() => {
    if (!isLoading && snapshot) {
      const data = snapshot.val();
      setWished(data);
    }
  }, [snapshot]);

  return (
    <>
      {!user && <LoginAlert isOpen={isOpen} onClose={onClose} />}
      <Box onClick={user ? () => addValue(!wished) : onOpen}>
        {wished ? (
          <GoHeartFill fontSize={fontSize} />
        ) : (
          <GoHeart fontSize={fontSize} />
        )}
      </Box>
    </>
  );
};
export default Wished;
