// packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// chakra stuff
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./assets/chakraTheme";

// state mgmt

// components and pages
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreatePost from "./pages/CreatePost/CreatePost";
import OtherUserProfile from "./pages/OtherUserProfile";

// style
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/create-post" element={<PrivateRoute />}>
              <Route path="/create-post" element={<CreatePost />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/users/:userId" exact element={<OtherUserProfile />} />
          </Routes>
        </Router>
        <ToastContainer />
      </>
    </ChakraProvider>
  );
}

export default App;
