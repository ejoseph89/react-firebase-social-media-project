import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import {
  Flex,
  Box,
  Center,
  Spinner,
  Heading,
  Avatar,
  Text,
  VStack,
} from "@chakra-ui/react";

import { db } from "../config/firebase";

import PostItem from "../components/Post/PostItem";

const OtherUserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const { userId } = useParams();

  // query db to get the user of user id userId
  const userRef = doc(db, "users", userId);

  const getUserDetails = async () => {
    const userSnap = await getDoc(userRef);

    setUser(userSnap.data());
  };

  // get all posts from firestore
  const postsRef = collection(db, "posts");

  const q = query(postsRef, where("userId", "==", userId));

  const getPosts = async () => {
    const querySnapshot = await getDocs(q);

    setPosts(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
    );
  };

  useEffect(() => {
    getUserDetails();
    getPosts();
  }, []);

  // make profile for queried user
  return (
    <Flex minH="90vh" bg="brand.200" w="100%" justify="center" p={6}>
      {!user ? (
        <Center>
          <Spinner
            size="xl"
            thickness="5px"
            speed=".65s"
            emptyColor="brand.300"
            color="brand.400"
          />
        </Center>
      ) : (
        <Box>
          <Center>
            <div>
              <Box textAlign="center">
                <Avatar
                  name={user.name}
                  size="2xl"
                  src={`${user.profileImg}`}
                />
                <Heading
                  as="h2"
                  fontSize={{ base: "24px", md: "36px", lg: "42px" }}
                  pb={6}
                  pt={3}
                  color="brand.100"
                  textAlign="center"
                >
                  {user.name}
                </Heading>
              </Box>

              <Box>
                <Heading
                  as="h2"
                  fontSize={{ base: "20px", md: "30px", lg: "38px" }}
                  pt={3}
                  color="brand.100"
                >
                  All Posts
                </Heading>
              </Box>
              <VStack>
                {posts?.map((post) => (
                  <PostItem key={post.postId} post={post} />
                ))}
              </VStack>
            </div>
          </Center>
        </Box>
      )}
    </Flex>
  );
};

export default OtherUserProfile;
