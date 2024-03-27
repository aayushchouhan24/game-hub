import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { GiCrossMark } from "react-icons/gi";
import GoogleLogin from "./GoogleLogin";
import { useRef } from "react";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const LoginAlert = ({ onClose, isOpen }: Props) => {
  const cancelRef = useRef(null);
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Login Required</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            To use this feature, you must login first.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="outline"
              borderWidth={1.5}
              bg={"var(--chakra-colors-whiteAlpha-100)"}
              borderRadius={24}
              marginEnd={2}
              ref={cancelRef}
              onClick={onClose}
            >
              <GiCrossMark fontSize={22} color="#B92E2E" />
            </Button>
            <GoogleLogin />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default LoginAlert;
