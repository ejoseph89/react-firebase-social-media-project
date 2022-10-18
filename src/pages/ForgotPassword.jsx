import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import {
  Box,
  Flex,
  Center,
  Heading,
  FormControl,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import {} from "@chakra-ui/icons";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      await sendPasswordResetEmail(auth, email);

      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send email");
    }
  };

  return (
    <Flex minH="90vh" bg="brand.200" w="100%" justify="center" align="center" p={6}>
      <Center w="100%" h="100%">
        <div>
          <header>
            <Heading
              as="h2"
              fontSize={{ base: "24px", md: "36px", lg: "42px" }}
              pb={6}
              color="brand.100"
              w={{ base: "300px", md: "400px", lg: "500px" }}
              textAlign="center"
            >
              Forgot Password?
            </Heading>
          </header>

          <main>
            <form onSubmit={(e) => onSubmit(e)}>
              <FormControl pb={4}>
                <Input
                  type="email"
                  variant="flushed"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  color="brand.100"
                />
              </FormControl>
              <Box py={8}>
                <Button
                  variant="outline"
                  type="submit"
                  w="100%"
                  bg="brand.400"
                  border="none"
                  color="brand.100"
                  _hover={{ color: "brand.100" }}
                >
                  Send Reset Link
                </Button>
              </Box>
              <Center>
                <Link className="forgot-password-link" to="/sign-in">
                  <Text
                    as="b"
                    py={3}
                    color="brand.100"
                    _hover={{ color: "brand.400" }}
                  >
                    Sign In
                  </Text>
                </Link>
              </Center>
            </form>
          </main>
        </div>
      </Center>
    </Flex>
  );
};

export default ForgotPassword;
