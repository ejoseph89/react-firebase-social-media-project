import { Box, Heading } from "@chakra-ui/react";

import PostList from "../components/Post/PostList";


const Explore = () => {
  return (
    <Box minH="90vh" bg="brand.200" w="100%" p={6}>
      <Box>
        <Heading
          as="h2"
          fontSize={{ base: "24px", md: "36px", lg: "42px" }}
          pb={6}
          color="brand.100"
          textAlign='center'
        >
          Explore
        </Heading>
      </Box>
      <Box>
        <PostList />
      </Box>
    </Box>
  );
};

export default Explore;
