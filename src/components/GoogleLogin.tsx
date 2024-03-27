import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <>
      <Button
        boxSize={10}
        onClick={signInWithGoogle}
        variant="outline"
        borderWidth={1.5}
        bg={"var(--chakra-colors-whiteAlpha-100)"}
        borderRadius={24}
        padding={0}
      >
        <FcGoogle />
      </Button>
    </>
  );
};
export default GoogleLogin;
