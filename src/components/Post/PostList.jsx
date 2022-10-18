import { useEffect, useState } from "react";
import { Box, Center, VStack, Spinner } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "../../config/firebase";

import PostItem from "./PostItem";

const PostList = () => {
  // state to save posts
  const [posts, setPosts] = useState(null);

  // get all posts from firestore
  const postsRef = collection(db, "posts");

  const q = query(postsRef, orderBy("timeStamp", "desc"));

  const getPosts = async () => {
    const querySnapshot = await getDocs(q);

    setPosts(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
    );

  };

  // query firestore on initial render
  useEffect(() => {
    getPosts();
  }, [ ]);

  return (
    <Box minH="90vh" w="100%" p={6}>
      {!posts ? (
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
        <VStack>
          {posts?.map((post) => (
            <PostItem key={post.postId} post={post} />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default PostList;
