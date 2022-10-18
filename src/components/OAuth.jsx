import {
  getAuth,
  signInWithPopup,
  // signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  // query,
  // where,
  // collection,
  serverTimestamp,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Center, Button, Text, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { db } from "../config/firebase";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const inOrUp = location.pathname === "/sign-in" ? " in " : " up ";

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check for user
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // if no user, create user
      if (!userSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          profileImg: user.photoURL,
          timeStamp: serverTimestamp(),
        });
      }

      navigate("/profile");
    } catch (error) {
      toast.error("Failt to authenticate with Google account");
    }
  };

  return (
    <Center py={4} pb={8}>
      <Button
        variant="link"
        onClick={onGoogleClick}
        _hover={{ textDecoration: "none" }}
      >
        <Text color="brand.100">Sign {inOrUp} with Google </Text>
        <Icon ml={3}>
          <FcGoogle size={28} />
        </Icon>
      </Button>
    </Center>
  );
}

export default OAuth;
