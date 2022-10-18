import { Navigate, Outlet } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  const { checkingStatus, loggedIn } = useAuthStatus();

  if (checkingStatus) {
    return (
      <Center>
        <Spinner
          size="xl"
          thickness="5px"
          speed=".65s"
          emptyColor="brand.300"
          color="brand.400"
        />
      </Center>
    );
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
