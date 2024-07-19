import React, { useState } from "react";
import { Box, Button, Heading, Input, useToast, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordFetch } from "../Redux/UserReducer/action";
import Navbar from "../Pages/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const userStore = useSelector((store) => store.UserReducer);

  const handleForgotPassword = () => {
    dispatch(forgotPasswordFetch({ email })).then((res) => {
      if (res?.message) {
        toast({
          title: "Success",
          description: "Password reset email sent successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEmail("");
      } else {
        toast({
          title: "Error",
          description: res?.error || "Failed to send password reset email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Box pb="2rem">
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        pt="100px"
      >
        <Box w={{ base: "90%", sm: "80%", md: "40%", lg: "30%" }}>
          <Box mt="15px">
            <Heading size="md">Forgot Password</Heading>
          </Box>
          <Box mt="35px">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb="1rem"
            />
            <Button
              w="100%"
              color="white"
              bg="#0056D2"
              _hover={{ background: "#1E88E5", color: "#CFD8DC" }}
              borderRadius="0"
              onClick={handleForgotPassword}
            >
              {userStore.loading ? (
                <Spinner color="white" />
              ) : (
                <Heading size="xs">Send Reset Email</Heading>
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
