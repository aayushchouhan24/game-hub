import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import useUserStore from "../stores/UserStore";

const Layout = () => {
  const user = useUserStore((s) => s.user);

  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Outlet key={user?.uid} />
      </Box>{" "}
    </>
  );
};
export default Layout;
