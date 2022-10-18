import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
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

import { db } from "../config/firebase";
import OAuth from "../components/OAuth";

const SignUp = () => {
  // state: password visibility
  const [showPassword, setShowPassword] = useState(false);
  // state: signup form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // destructuring formData object
  const { name, email, password } = formData;
  // initializing useNavigate
  const navigate = useNavigate();
  // setting formData onChange of signup form fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // creating user and saving to firestore db on signup form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // signing up user
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, { displayName: name });

      // save new user to firestore
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();
      formDataCopy.uid = user.uid;

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      // redirect to home
      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
                Sign Up
              </Heading>
            </header>
            <main>
              <form onSubmit={onSubmit}>
                <FormControl pb={4}>
                  <Input
                    type="text"
                    variant="flushed"
                    color="brand.100"
                    placeholder="Name"
                    id="name"
                    value={name}
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl pb={4}>
                  <Input
                    type="email"
                    variant="flushed"
                    color="brand.100"
                    className="email-input"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={onChange}
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
                    Sign Up
                  </Button>
                </Box>
              </form>

              <OAuth />

              <Center>
                <Link to="/sign-in" className="register-link">
                  <Text
                    as="b"
                    py={3}
                    align="center"
                    color="brand.100"
                    _hover={{ color: "brand.400" }}
                  >
                    Sign In Instead
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

export default SignUp;
