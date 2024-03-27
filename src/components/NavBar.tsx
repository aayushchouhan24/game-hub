import { HStack } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { UserNav } from "./UserNav";
import { SiAmazongames } from "react-icons/si";
import useUserStore from "../stores/UserStore";

const NavBar = () => {
  const user = useUserStore((s) => s.user);

  return (
    <HStack gap={5} paddingTop={10} paddingX={10}>
      <Link to={"/"}>
        <SiAmazongames fontSize={40} />
      </Link>
      <SearchInput></SearchInput>
      {!user ? <GoogleLogin /> : <UserNav />}
    </HStack>
  );
};

export default NavBar;
