import {
  Avatar,
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../stores/UserStore";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import useFirebase from "../hooks/useFirebase";

export const UserNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useUserStore((s) => s.user);
  const { signOut, signInWithGoogle } = useAuth();
  const { snapshot } = useFirebase(`Users/${user?.uid}/cart/`);

  const { pathname } = useLocation();

  return (
    <>
      <Avatar
        boxSize={10}
        onClick={onOpen}
        src={user?.photoURL ?? ""}
        name={user?.displayName ?? ""}
        borderWidth={1.5}
        borderColor={"var(--chakra-colors-whiteAlpha-300)"}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerContent
          boxShadow={"none"}
          height={"fit-content"}
          borderRadius={10}
          marginTop={100}
          marginRight={50}
        >
          <DrawerCloseButton />
          <DrawerHeader>{user?.displayName}</DrawerHeader>
          <DrawerBody>
            <Link to={"/"}>
              <HStack>
                <Button onClick={signOut}>Logout</Button>
                <Button
                  onClick={() => {
                    signInWithGoogle();
                    onClose();
                  }}
                >
                  Switch Account
                </Button>

                {pathname == "/cart" ? (
                  <Link onClick={onClose} to={`/`}>
                    <HStack>
                      <FaHome fontSize={28} />
                    </HStack>
                  </Link>
                ) : (
                  <Link onClick={onClose} to={`/cart`}>
                    <HStack>
                      <FaShoppingCart fontSize={28} />
                      <Badge
                        as={"p"}
                        textAlign={"center"}
                        variant="solid"
                        borderRadius={100}
                        colorScheme="green"
                        fontSize={10}
                        marginBottom={35}
                      >
                        {snapshot?.size}
                      </Badge>
                    </HStack>
                  </Link>
                )}
              </HStack>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
