import React, { useState } from "react";
import { Box, Button, Heading, Input, useToast, Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Pages/Navbar";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    axios
      .post(`/reset-password/${token}`, { password })
      .then((response) => {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.response.data.message || "Failed to reset password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
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
            <Heading size="md">Reset Password</Heading>
          </Box>
          <Box mt="35px">
            <Input
              placeholder="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb="1rem"
            />
            <Input
              placeholder="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              mb="1rem"
            />
            <Button
              w="100%"
              color="white"
              bg="#0056D2"
              _hover={{ background: "#1E88E5", color: "#CFD8DC" }}
              borderRadius="0"
              onClick={handleResetPassword}
            >
              {loading ? (
                <Spinner color="white" />
              ) : (
                <Heading size="xs">Reset Password</Heading>
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
