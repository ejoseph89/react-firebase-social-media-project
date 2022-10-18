import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  Flex,
  Box,
  Center,
  Button,
  Heading,
  FormControl,
  Input,
  Avatar,
} from "@chakra-ui/react";

import { db } from "../config/firebase";

const Profile = () => {
  const auth = getAuth();

  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [changeDetails, setChangeDetails] = useState(false);

  const { name, email } = formData;

  const navigate = useNavigate();

  // setup logout functionality
  const onLogout = async () => {
    auth.signOut();
    navigate("/sign-in");
  };

  // handle form submission for updating personal details
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update display name in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);

        await updateDoc(userRef, {
          name,
        });
      }
      // updating email
      // if (auth.currentUser.email !== email) {
      //   console.log("update email to", email);
      //   await updateEmail(auth.currentUser, email);

      //   const userRef = doc(db, "users", auth.currentUser.uid);

      //   await updateDoc(userRef, {
      //     email,
      //   });
      // }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update personal details. Try again");
    }
  };

  // update state on input change for updating personal details
  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Flex
      minH="90vh"
      bg="brand.200"
      w="100%"
      justify="center"
      align="center"
      p={6}
    >
      <Center>
        <div>
          <Box textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: "24px", md: "36px", lg: "42px" }}
              pb={6}
              color="brand.300"
            >
              Profile
            </Heading>
            <Box mt={8} mb={2}>
              <Avatar
                name={name}
                size="2xl"
                src={`${auth.currentUser.photoURL}`}
              />
              <Heading
                as="h2"
                fontSize={{ base: "20px", md: "30px", lg: "36px" }}
                pb={6}
                pt={3}
                color="brand.100"
              >
                {name}
              </Heading>
              {/* <form>
                <Input
                onChange={(e) => onImgInputChange(e)}
                  size="sm"
                  variant="unstyled"
                  type="file"
                  color="brand.100"
                  ml={16}
                  sx={{
                    "::file-selector-button": {
                      height: 10,
                      padding: 0,
                      mr: 4,
                      background: "none",
                      color: "brand.100",
                      border: "none",
                      fontWeight: "bold",
                    },
                  }}
                ></Input>
                <Button>Upload</Button>
              </form> */}
            </Box>
            <Box>
              <Button
                type="button"
                onClick={onLogout}
                variant="link"
                color="brand.100"
                _hover={{ textDecoration: "none" }}
              >
                Logout
              </Button>
            </Box>
          </Box>
          <main>
            <Box>
              <Heading as="h4" fontSize="16px" py={4} color="brand.100">
                Personal Details
              </Heading>
              <Button
                variant="link"
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
                style={{ cursor: "pointer" }}
                color="brand.100"
                _hover={{ textDecoration: "none" }}
              >
                {changeDetails ? "Save" : "Edit"}
              </Button>
            </Box>
            <div className="profile-card">
              <form>
                <FormControl py={3}>
                  <Input
                    type="text"
                    id="name"
                    disabled={!changeDetails}
                    value={name}
                    color="brand.100"
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    disabled
                    value={email}
                    color="brand.100"
                    onChange={onChange}
                  />
                </FormControl>
              </form>
            </div>
          </main>
        </div>
      </Center>
    </Flex>
  );
};

export default Profile;
