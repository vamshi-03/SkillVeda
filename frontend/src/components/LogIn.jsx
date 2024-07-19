import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Pages/Navbar";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginFetch } from "../Redux/UserReducer/action";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "./SignUp";

const Login = () => {
  const emailInput = useRef(null);
  const backgroundRef = useRef(null);
  const emailbox = useRef(null);
  const passwordInput = useRef(null);
  const passwordbox = useRef(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const userStore = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  // Show input fields when clicking on email/password headers
  function showInput(e) {
    const ele = e.target.id;
    if (ele === "email") {
      emailInput.current.style.display = "block";
      emailInput.current.focus();
      emailbox.current.style.padding = "5px 20px";
    } else if (ele === "password") {
      passwordInput.current.style.display = "block";
      passwordInput.current.focus();
      passwordbox.current.style.padding = "5px 20px";
    }
  }

  // Hide input fields when clicking outside
  function blockInput(event) {
    if (event.target === backgroundRef.current && !form.email) {
      emailInput.current.style.display = "none";
      emailbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.password) {
      passwordInput.current.style.display = "none";
      passwordbox.current.style.padding = "20px";
    }
  }

  // Handle input change
  function handleInput(e) {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  }

  // Handle login button click
  function handleLogin() {
    dispatch(loginFetch(form)).then((res) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.message) {
        showToast({ toast, message: "Login Successful", color: "green" });
        setForm({ email: "", password: "" });
      } else {
        showToast({ toast, message: userStore?.isError, color: "red" });
      }
    });
  }

  // Redirect user after successful login
  useEffect(() => {
    if (userStore.isAuth) {
      switch (userStore?.role) {
        case "user":
          navigate("/home");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "teacher":
          navigate("/TeacherDashboard");
          break;
        default:
          break;
      }
    }
  }, [userStore?.isAuth, userStore?.role, navigate]);

  return (
    <Box pb="2rem">
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        pt="100px"
        onClick={blockInput}
        ref={backgroundRef}
      >
        <Box w={{ base: "90%", sm: "80%", md: "40%", lg: "30%" }}>
          <Box mt="15px">
            <Heading size="md">Log in to your elearning Account</Heading>
          </Box>
          <Box mt="35px">
            <Box
              border="1px solid"
              p="20px"
              id="email"
              m="5px 0"
              onClick={showInput}
              ref={emailbox}
            >
              <Heading id="email" size="xs">
                Email
              </Heading>
              <Input
                display="none"
                ref={emailInput}
                border="none"
                p="0px"
                focusBorderColor="transparent"
                _focus={{ outline: "none" }}
                name="email"
                value={form.email}
                onChange={handleInput}
              />
            </Box>
            <Box
              border="1px solid"
              p="20px"
              id="password"
              m="5px 0"
              onClick={showInput}
              ref={passwordbox}
            >
              <Heading id="password" size="xs">
                Password
              </Heading>
              <Input
                type="password"
                display="none"
                ref={passwordInput}
                border="none"
                size="sm"
                focusBorderColor="transparent"
                _focus={{ outline: "none" }}
                name="password"
                value={form.password}
                onChange={handleInput}
              />
            </Box>
            <Flex justify="space-between" mt="1rem">
              <Text fontSize="sm">Don't have an account?</Text>
              <Link to="/signup">
                <Text fontSize="sm" fontWeight="500" color="blue.500">
                  Sign Up
                </Text>
              </Link>
            </Flex>
            <Flex justify="space-between" mt="1rem">
              <ChakraLink as={Link} to="/forgot-password" fontSize="sm" color="blue.500">
                Forgot Password?
              </ChakraLink>
            </Flex>
            <Button
              w="100%"
              color="white"
              bg="#0056D2"
              _hover={{ background: "#1E88E5", color: "#CFD8DC" }}
              borderRadius="0"
              mt="1rem"
              onClick={handleLogin}
            >
              {userStore.loading ? (
                <Spinner color="white" />
              ) : (
                <Heading size="xs">Log in</Heading>
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
