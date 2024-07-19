import { Flex, Text, Button, Image, Box } from "@chakra-ui/react";
import teacher from "../../asset/A.png";
import { useNavigate } from "react-router-dom";
const Section1 = () => {
  const navigate = useNavigate();
  return (
    
    <Flex mt={100} mb={70} gap={50} p="15px" justify="center">
      <Box
        display={{base:'none', sm: "none", md: "flex" }}
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={teacher}
          alt="Your Image"
          width={{
            md: "60%",
            lg: "80%",
          }}
          objectFit="contain"
        />
      </Box>
      <Flex
        direction="column"
        w={{
          base: "100%",
          sm: "60%",
          md: "55%",
          lg: "50%",
        }}
        gap={30}
      >
        <Text
          fontSize={{
            base: "70px",
            sm: "30px",
            md: "60px",
            lg: "80px",
          }}
          fontWeight="bold"
          fontFamily="poppins"
        >
          Learn without limits
        </Text>
        <Text
          fontSize={{
            lg: "18px",
            md: "16px",
            sm: "14px",
            base: "20px",
          }}
          fontWeight="semibold"
        >
          <Text fontSize='2rem' color="black" display='inline'>SkillVeda</Text> Seamlessly Bridging Educators and Students Online. Instructors develop personalized courses across various subjects and grade levels, while students discover and enroll in courses that cater to their individual needs. By empowering both educators and learners, SkillVeda is transforming the online education experience.
        </Text>
        <Flex
          gap={30}
          direction={{
            base: "column",
            sm: "column",
            md: "row",
            lg: "row",
          }}
        >
          <Button
            bg="#0056d2"
            color="white"
            size="lg"
            p={{
              lg: "30px 60px",
              md: "25px 50px",
              sm: "20px 40px",
            }}
            border="3px solid #0056d2"
            borderRadius={"2rem"}
            _hover={{ background: "#FAF5F5", color: "#0D47A1" }}
            onClick={() => navigate("/signup")}
          >
            Join for Free
          </Button>
          {/* <Button
            colorScheme="#0056d2"
            color="#0056d2"
            variant="outline"
            size="lg"
            p={{
              lg: "30px 60px",
              md: "25px 50px",
              sm: "20px 40px",
            }}
            border="3px solid #0056d2"
            onClick={() => navigate("/login")}
          >
            Try SkillVeda for Business
          </Button> */}
        </Flex>
      </Flex>
      
    </Flex>
  );
};

export default Section1;
