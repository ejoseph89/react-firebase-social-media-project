import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Flex,
  Box,
  Center,
  Heading,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import OAuth from "../components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/profile");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  };

  return (
    <>
      <Flex minH="90vh" bg="brand.200" w="100%" justify='center' align='center' p={6}>
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
                Welcome Back!
              </Heading>
            </header>
            <main>
              <form onSubmit={onSubmit}>
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
                <FormControl pb={4}>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      variant="flushed"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={onChange}
                      color="brand.100"
                    />
                    <InputRightElement>
                      <IconButton
                        size="sm"
                        variant="link"
                        h="1.75rem"
                        color="brand.100"
                        onClick={() =>
                          setShowPassword((prevState) => !prevState)
                        }
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </IconButton>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Link to="/forgot-password">
                  <Text
                    as="b"
                    py={3}
                    color="brand.100"
                    _hover={{ color: "brand.400" }}
                  >
                    Forgot Password ?
                  </Text>
                </Link>

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
                    Sign In
                  </Button>
                </Box>
              </form>

              <OAuth />

              <Center>
                <Link to="/sign-up" className="register-link">
                  <Text
                    as="b"
                    py={3}
                    align="center"
                    color="brand.100"
                    _hover={{ color: "brand.400" }}
                  >
                    Sign Up Instead
                  </Text>
                </Link>
              </Center>
            </main>
          </div>
        </Center>
      </Flex>
    </>
  );
};

export default SignIn;
