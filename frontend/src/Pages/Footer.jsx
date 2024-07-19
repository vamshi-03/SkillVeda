import React from "react";
import { Box, Grid, Heading, Link, Flex, Image, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      bg="#f5f5f5"
      p={5}
      paddingBottom={{
        sm: "60px",
        md: "60px",
        lg: "20px",
      }}
      fontFamily="Source Sans 3"
      pt="60px"
      direction="column"
    >
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)", // Smallest screen size (1 column)
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)", // Medium screen size (2 columns)
          lg: "repeat(4, 1fr)", // Large screen size (4 columns)
        }}
        gap={4}
      >
        <Box
          pl={{
            lg: "25px",
            md: "15px",
            sm: "10px",
          }}
          pr={{
            lg: "35px",
            md: "15px",
            sm: "10px",
          }}
        >
          <Heading as="h6" size="md" fontWeight="bold">
            Learn Something New
          </Heading>
          <br />
          <Link fontSize="13.5px">Learn a Language</Link>
          <br />
          <Link fontSize="13.5px">Learn Accounting</Link>
          <br />
          <Link fontSize="13.5px">Learn Coding</Link>
          <br />
          <Link fontSize="13.5px">Learn Copywriting</Link>
          <br />
          <Link fontSize="13.5px">Learn HR</Link>
          <br />
          <Link fontSize="13.5px">Learn Public Relations</Link>
          <br />
          <Link fontSize="13.5px">Boulder MS Data Science</Link>
          <br />
          <Link fontSize="13.5px">Illinois iMBA</Link>
          <br />
          <Link fontSize="13.5px">Illinois MS Computer Science</Link>
          <br />
          <Link fontSize="13.5px">UMich MS in Applied Data Science</Link>
        </Box>

        <Box
          pl={{
            lg: "25px",
            md: "15px",
            sm: "10px",
          }}
          pr={{
            lg: "35px",
            md: "15px",
            sm: "10px",
          }}
        >
          <Heading as="h6" size="md" fontWeight="bold">
            Popular Topics
          </Heading>
          <br />
          <Link fontSize="13.5px">Accounting</Link>
          <br />
          <Link fontSize="13.5px">Cybersecurity</Link>
          <br />
          <Link fontSize="13.5px">Data Analysis</Link>
          <br />
          <Link fontSize="13.5px">Data Science</Link>
          <br />
          <Link fontSize="13.5px">Excel</Link>
          <br />
          <Link fontSize="13.5px">Google</Link>
          <br />
          <Link fontSize="13.5px">Machine Learning</Link>
          <br />
          <Link fontSize="13.5px">Project Management</Link>
          <br />
          <Link fontSize="13.5px">Python</Link>
          <br />
          <Link fontSize="13.5px">SQL</Link>
        </Box>

        <Box
          pl={{
            lg: "25px",
            md: "15px",
            sm: "10px",
          }}
          pr={{
            lg: "35px",
            md: "15px",
            sm: "10px",
          }}
        >
          <Heading as="h6" size="md" fontWeight="bold">
            Popular Certificates
          </Heading>
          <br />
          <Link fontSize="13.5px">Google Data Analytics</Link>
          <br />
          <Link fontSize="13.5px">Google Digital Marketing & Ecommerce</Link>
          <br />
          <Link fontSize="13.5px">Google IT Automation with Python</Link>
          <br />
          <Link fontSize="13.5px">Google IT Support</Link>
          <br />
          <Link fontSize="13.5px">Google Project Management</Link>
          <br />
          <Link fontSize="13.5px">Google UX Design</Link>
          <br />
          <Link fontSize="13.5px">IBM Data Analyst</Link>
          <br />
          <Link fontSize="13.5px">IBM Data Science</Link>
          <br />
          <Link fontSize="13.5px">Intuit Bookkeeping</Link>
          <br />
          <Link fontSize="13.5px">Meta Front-End Developer</Link>
        </Box>

        <Box
          pl={{
            lg: "25px",
            md: "15px",
            sm: "10px",
          }}
          pr={{
            lg: "35px",
            md: "15px",
            sm: "10px",
          }}
        >
          <Heading as="h6" size="md" fontWeight="bold">
            Featured Articles
          </Heading>
          <br />
          <Link fontSize="13.5px">
            A Comprehensive Guide to Becoming a Data Analyst
          </Link>
          <br />
          <Link fontSize="13.5px">
            Advance Your Career With A Cybersecurity Certification
          </Link>
          <br />
          <Link fontSize="13.5px">Get Your Data Analytics Certification</Link>
          <br />
          <Link fontSize="13.5px">
            How to Break into the Field of Data Analysis
          </Link>
          <br />
          <Link fontSize="13.5px">
            Jumpstart Your Data Career with a SQL Certification
          </Link>
          <br />
          <Link fontSize="13.5px">Learn How to Become PMP Certified</Link>
          <br />
          <Link fontSize="13.5px">
            Start Your Career with CAPM Certification
          </Link>
          <br />
          <Link fontSize="13.5px">
            Understanding the Role and Responsibilities of a Scrum Master
          </Link>
          <br />
          <Link fontSize="13.5px">
            Unlock Your Potential with a PMI Certification
          </Link>
          <br />
          <Link fontSize="13.5px">
            What You Should Know About CompTIA A+ Certification
          </Link>
        </Box>
      </Grid>
      <Flex
        mt={15}
        gap={7}
        backgroundColor={"#c9c9c9"}
        borderTop="1px solid #c9c9c9"
        direction={{
          sm: "column",
          md: "row",
          lg: "row",
        }}
        justifyContent={{
          lg: "space-between",
        }}
        alignItems="center"
        padding={{
          sm: "10px",
          md: "35px",
          lg: "55px",
        }}
      >
        <Box>
          {" "}
          <Text fontSize="13.5px">
            © 2024 SkillVeda Inc. All rights reserved.
          </Text>
        </Box>
        <Flex spacing={4} overflow='hidden'>
          <a href="https://www.facebook.com/" target="blank">
          <Image
            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/facebook.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
            alt=""
            mr={4}
            
          />
          </a>
          <a href="https://www.linkedin.com" target="blank">
          <Image
            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/linkedin.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
            alt=""
            mr={4}
          />
          </a>
          <a href="https://www.x.com/" target="blank">
          <Image
            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/twitter.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
            alt=""
            mr={4}
          />
          </a>
          <a href="https://www.youtube.com/" target="blank">
          <Image
            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/youtube.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
            alt=""
            mr={4}
          />
          </a>
          <a href="https://www.instagram.com/" target="blank">
          <Image
          display={{
            base:"none",
            sm:"block"
          }}
            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/instagram.png?auto=format%2Ccompress&dpr=1&w=28&h=28&q=40"
            alt=""
            mr={4}
          />
          </a>
          
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
