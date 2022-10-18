import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Flex,
  Center,
  Heading,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../../config/firebase";
import { useAuthStatus } from "../../hooks/useAuthStatus";

const Form = () => {
  const { loggedInUser } = useAuthStatus();

  const schema = yup.object().shape({
    title: yup.string().required("You gotta add a title!"),
    description: yup.string().required("Come on, what's on your mind??"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onCreatePost = async (data) => {
    const newPostRef = doc(collection(db, "posts"));

    await setDoc(newPostRef, {
      title: data.title,
      description: data.description,
      userName: loggedInUser?.displayName,
      userId: loggedInUser?.uid,
      postId: newPostRef.id,
      timeStamp: serverTimestamp(),
    });

    navigate("/");
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
      <Center minWidth="275px" width="350px">
        <form
          style={{ minWidth: "100%", color: "#e7e7e7" }}
          onSubmit={handleSubmit(onCreatePost)}
        >
          <Heading
            as="h2"
            fontSize={{ base: "24px", md: "36px", lg: "42px" }}
            pb={6}
            color="brand.100"
            textAlign="center"
          >
            Share something
          </Heading>
          <FormControl py={3} isInvalid={errors.title}>
            <Input
              placeholder="What's happening?"
              {...register("title")}
              focusBorderColor="brand.100"
              errorBorderColor="brand.100"
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl py={3} isInvalid={errors.description}>
            <Textarea
              placeholder="Care to elaborate? "
              {...register("description")}
              focusBorderColor="brand.100"
              errorBorderColor="brand.100"
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <Button
            my={8}
            variant="outline"
            type="submit"
            w="100%"
            bg="brand.400"
            border="none"
            color="brand.100"
            _hover={{ color: "brand.100" }}
            _type="submit"
          >
            Create Post
          </Button>
        </form>
      </Center>
    </Flex>
  );
};

export default Form;
