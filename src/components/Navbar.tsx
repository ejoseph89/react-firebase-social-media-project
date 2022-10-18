import { Flex } from "@chakra-ui/react";

import CustomLink from "./CustomLink";
import { useAuthStatus } from "../hooks/useAuthStatus";

const Navbar = () => {
  const { loggedInUser } = useAuthStatus();

  return (
    <nav className="navbar">
      <Flex alignItems="center" justifyContent="space-evenly" h="10vh" minH={50}>
        <CustomLink to="/">Explore</CustomLink>
        <CustomLink to="/profile">Profile</CustomLink>
        {!loggedInUser ? (
          <CustomLink to="/sign-in">Sign In</CustomLink>
        ) : (
          <CustomLink to="/create-post">Create Post</CustomLink>
        )}
      </Flex>
    </nav>
  );
};

export default Navbar;
