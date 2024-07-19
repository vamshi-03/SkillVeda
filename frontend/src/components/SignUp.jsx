import React, { useRef, useState } from "react";
import Navbar from "../Pages/Navbar";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  Toast,
  keyframes,
  useToast,
  Checkbox,
} from "@chakra-ui/react";

import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpFetch } from "../Redux/UserReducer/action";
import { actionsingUpError } from "../Redux/UserReducer/actionType";

// Success and Error Toasts
export const showToast = ({ toast, message, color }) => {
  toast({
    position: "top-right",
    top: "100px",
    duration: 3000,
    render: () => (
      <Box color="white" p={3} bg={color}>
        {message || "Something Went Wrong. Please Refresh"}
      </Box>
    ),
  });
};

const SignUp = () => {
  const emailInput = useRef(null);
  const backgroundRef = useRef(null);
  const emailbox = useRef(null);
  const passwordInput = useRef(null);
  const passwordbox = useRef(null);
  const nameInput = useRef(null);
  const namebox = useRef(null);
  const confirmPasswordInput = useRef(null);
  const confirmPasswordbox = useRef(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    isPromotion: false,
    role: "user", // Default role set to 'user'
  });

  const navigate = useNavigate();
  const userStore = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [eyeclose, setEyeClose] = useState(false);
  const toast = useToast();

  // Show input field
  const showInput = (e) => {
    const ele = e.target.id;
    if (ele === "email") {
      emailInput.current.style.display = "block";
      emailInput.current.focus();
      emailbox.current.style.padding = "5px 20px";
    } else if (ele === "password") {
      passwordInput.current.style.display = "block";
      passwordInput.current.focus();
      passwordbox.current.style.padding = "5px 20px";
    } else if (ele === "name") {
      nameInput.current.style.display = "block";
      nameInput.current.focus();
      namebox.current.style.padding = "5px 20px";
    } else if (ele === "confirmPassword") {
      confirmPasswordInput.current.style.display = "block";
      confirmPasswordInput.current.focus();
      confirmPasswordbox.current.style.padding = "5px 20px";
    }
  };

  // Hide input field on background click
  const blockInput = (event) => {
    if (event.target === backgroundRef.current && !form.email) {
      emailInput.current.style.display = "none";
      emailbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.password) {
      passwordInput.current.style.display = "none";
      passwordbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.confirmPassword) {
      confirmPasswordInput.current.style.display = "none";
      confirmPasswordbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.name) {
      nameInput.current.style.display = "none";
      namebox.current.style.padding = "20px";
    }
  };

  // Handle form input change
  const handleInput = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setEyeClose(!eyeclose);
    passwordInput.current.type === "password"
      ? (passwordInput.current.type = "text")
      : (passwordInput.current.type = "password");
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setForm({ ...form, isPromotion: !isChecked });
  };

  // Handle role selection change
  const handleRoleChange = (e) => {
    const { value } = e.target;
    setForm({ ...form, role: value });
  };

  // Handle SignUp
  const handleSignUp = async () => {
    const { email, password, confirmPassword, name, role } = form;

    // Validation checks
    if (!email || !password || !confirmPassword || !name) {
      dispatch(actionsingUpError("All fields are required"));
      return;
    }

    if (confirmPassword !== password) {
      dispatch(actionsingUpError("Passwords do not match"));
      return;
    }

    if (password.length < 8) {
      dispatch(
        actionsingUpError("Password should be at least 8 characters long")
      );
      return;
    }

    // Dispatch SignUp action
    dispatch(signUpFetch(form)).then((res) => {
      if (!userStore?.isError) {
        setForm({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          role: "user", // Reset role to default after successful signup
        });
        showToast({ toast, message: "Sign Up Successful", color: "green" });
        navigate("/login");
      } else {
        showToast({ toast, message: userStore?.isError, color: "red" });
      }
    });
  };

  return (
    <Box pb="2rem">
      <Box>
        <Navbar />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        onClick={blockInput}
        ref={backgroundRef}
        pt="100px"
      >
        <Box w={{ base: "90%", sm: "80%", md: "40%", lg: "30%" }}>
          <Box mt="15px">
            <Heading size="md">Sign up and start learning</Heading>
          </Box>
          <Box mt="35px">
            {/* Name */}
            <Box
              border="1px solid"
              p="20px"
              id="name"
              m="5px 0"
              onClick={showInput}
              ref={namebox}
            >
              <Heading id="name" size="xs">
                Name
              </Heading>
              <Input
                type="text"
                display="none"
                ref={nameInput}
                border="none"
                size="sm"
                focusBorderColor="transparent"
                _focus={{ outline: "none" }}
                name="name"
                value={form.name}
                onChange={handleInput}
              />
            </Box>
            {/* Email */}
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
                type="email"
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
            {/* Password */}
            <Box
              border="1px solid"
              p="20px"
              id="password"
              m="5px 0"
              onClick={showInput}
              ref={passwordbox}
            >
              <Flex justify="space-between" align="center">
                <Heading id="password" size="xs">
                  Password
                </Heading>
                <Box onClick={togglePasswordVisibility}>
                  {eyeclose ? <AiFillEye size="20px" /> : <AiOutlineEyeInvisible size="20px" />}
                </Box>
              </Flex>
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
            {/* Confirm Password */}
            <Box
              border="1px solid"
              p="20px"
              id="confirmPassword"
              m="5px 0"
              onClick={showInput}
              ref={confirmPasswordbox}
            >
              <Heading id="confirmPassword" size="xs">
                Confirm Password
              </Heading>
              <Input
                type="password"
                display="none"
                ref={confirmPasswordInput}
                border="none"
                size="sm"
                focusBorderColor="transparent"
                _focus={{ outline: "none" }}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleInput}
              />
            </Box>
            {/* Role Selection */}
            <Box border="1px solid" p="20px" m="5px 0">
              <Heading size="xs">Role</Heading>
              <select
                onChange={handleRoleChange}
                value={form.role}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              >
                <option value="user">User</option>
                {/* <option value="student">Student</option> */}
                <option value="teacher">Teacher</option>
                
              </select>
            </Box>
            {/* Promotion Checkbox */}
            <Box display="flex" alignItems="center">
              <Checkbox
                isChecked={isChecked}
                onChange={handleCheckboxChange}
                colorScheme="blue"
                size="lg"
              />
              <Text p="10px">
                Send me special offers, personalized recommendations, and
                learning tips.
              </Text>
            </Box>
            {/* Sign Up Button */}
            <Box mt="15px">
              <Button
                w="100%"
                color="white"
                bg="#0056D2"
                _hover={{ background: "#1E88E5", color: "#CFD8DC" }}
                borderRadius="0"
                textAlign="center"
                onClick={handleSignUp}
              >
                <Heading size="xs">
                  {userStore.loading ? <Spinner color="white" /> : "Sign Up"}
                </Heading>
              </Button>
            </Box>
            {/* Login Link */}
            <Box display="flex" m="1rem 0" fontSize="0.7rem">
              <Text>You already have an account with us?</Text>
              <Link to="/login">
                <Text _hover={{}} fontWeight="500" ml="0.5rem" color="black">
                  Login
                </Text>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
