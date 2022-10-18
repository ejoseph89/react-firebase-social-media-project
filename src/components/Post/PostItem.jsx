import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import {
  doc,
  collection,
  getDocs,
  where,
  query,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../config/firebase";
import { useAuthStatus } from "../../hooks/useAuthStatus";

const PostItem = ({ post }) => {
  const [likes, setLikes] = useState(null);

  const postDate = new Date(post.timeStamp.seconds * 1000);

  // stupid way to get around dealing with the url doubling when using PostList in OtherUserProfile component - ask someone how to deal with this properly, instead of conditionaly rendering the link based on location.pathname
  const location = useLocation();
  const match = location.pathname === `/users/${post.userId}`;

  // getting current user
  const { loggedInUser } = useAuthStatus();

  // 'like' system
  const likesRef = collection(db, "likes");

  // adding a like
  const addLike = async () => {
    try {
      await addDoc(likesRef, {
        userId: loggedInUser?.uid,
        postId: post.postId,
      });
      if (loggedInUser) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: loggedInUser?.uid }]
            : [{ userId: loggedInUser?.uid }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // remove a like
  const removeLike = async () => {
    try {
      const likeToDeleteQ = query(likesRef, where("postId", "==", post.postId), where("userId", "==", loggedInUser?.uid));

      const likeToDeleteData = await getDocs(likeToDeleteQ)
      const likeId = likeToDeleteData.docs[0].id

      const likeToDelete = doc(db, "likes", likeId);

      await deleteDoc(likeToDelete);

      if (loggedInUser) {
        setLikes((prev) => prev.filter((like) => like.id === likeId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // getting likes for a post from firestore
  const q = query(likesRef, where("postId", "==", post.postId));
  const getLikes = async () => {
    const data = await getDocs(q);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  // check if current user liked the post
  const hasUserLiked = likes?.find((like) => like.userId === loggedInUser?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <Box
      color="brand.100"
      my={6}
      p={8}
      borderRadius="md"
      width={{ base: "xs", md: "lg", lg: "3xl" }}
      boxShadow="2xl"
    >
      <Flex>
        <Avatar size={{ base: "sm", lg: "md" }} />
        <Flex width="100%" justifyContent="space-between">
          <Box ml={4} mb={4}>
            {match ? (
              <Heading
                as="h4"
                fontSize={{ base: "14px", md: "18px", lg: "20px" }}
              >
                {post.userName}
              </Heading>
            ) : (
              <Link to={`users/${post.userId}`} disabled>
                <Heading
                  as="h4"
                  fontSize={{ base: "14px", md: "18px", lg: "20px" }}
                >
                  {post.userName}
                </Heading>
              </Link>
            )}
            <Text fontSize={14} color="brand.300">
              Posted {moment(postDate).fromNow()}
            </Text>
          </Box>
          {/* testing post menu */}
          <Box>
            <Menu>
              <MenuButton>
                <Icon as={HiDotsHorizontal} _hover={{ cursor: "pointer" }} />
              </MenuButton>
              <MenuList bg="brand.200">
                <MenuItem
                  color="brand.100"
                  bg="brand.200"
                  _focus={{ bg: "brand.200" }}
                  _active={{ bg: "brand.200" }}
                >
                  <span>Report post</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Box>
        <Heading as="h5" fontSize="20px" fontWeight="medium" my={3}>
          {post.title}
        </Heading>
        <Text>{post.description}</Text>
      </Box>
      <Flex pt={4}>
        <Flex align="center" mr={2}>
          <IconButton
            icon={
              hasUserLiked ? (
                <AiOutlineDislike onClick={removeLike} />
              ) : (
                <AiOutlineLike onClick={addLike} />
              )
            }
            fontSize="25px"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
          />

          {likes && <Text fontSize={12}>{likes.length}</Text>}
        </Flex>
        <Flex align="center" mr={2}>
          <IconButton
            icon={<AiOutlineComment />}
            fontSize="25px"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
          />
          <Text fontSize={12}>14</Text>
        </Flex>
        <Box>
          <IconButton
            icon={<AiOutlineShareAlt />}
            fontSize="25px"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default PostItem;
