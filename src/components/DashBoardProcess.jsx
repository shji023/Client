import React from "react";
// Chakra imports
import { Box, Flex, Text } from "@chakra-ui/react";

// Styles for the circular progressbar
import "react-circular-progressbar/dist/styles.css";

// Custom components
import Card from "components/Card/Card.js";

import * as GradientProgress from "@delowar/react-circle-progressbar";

function DashBoardProcess() {
  return (
    <div>
      <Card gridArea={{ md: "2 / 2 / 3 / 3", "2xl": "auto" }} style={{ backgrondColor: "blue" }}>
        <Flex direction="column">
          <Flex justify="space-between" align="center" mb="40px">
            <Text color="#fff" fontSize="lg" fontWeight="bold">
              Referral Tracking
            </Text>
            {/* <Button borderRadius="12px" w="38px" h="38px" bg="#22234B" _hover="none" _active="none">
              <Icon as={IoEllipsisHorizontal} color="#7551FF" />
            </Button> */}
          </Flex>
          <Flex direction={{ sm: "column", md: "row" }}>
            <Flex direction="column" me={{ md: "6px", lg: "52px" }} mb={{ sm: "16px", md: "0px" }}>
              <Flex
                direction="column"
                p="22px"
                pe={{ sm: "22e", md: "8px", lg: "22px" }}
                minW={{ sm: "220px", md: "140px", lg: "220px" }}
                bg="linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)"
                borderRadius="20px"
                mb="20px"
              >
                <Text color="gray.400" fontSize="sm" mb="4px">
                  Invited
                </Text>
                <Text color="#fff" fontSize="lg" fontWeight="bold">
                  145 people
                </Text>
              </Flex>
              <Flex
                direction="column"
                p="22px"
                pe={{ sm: "22px", md: "8px", lg: "22px" }}
                minW={{ sm: "170px", md: "140px", lg: "170px" }}
                bg="linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)"
                borderRadius="20px"
              >
                <Text color="gray.400" fontSize="sm" mb="4px">
                  Bonus
                </Text>
                <Text color="#fff" fontSize="lg" fontWeight="bold">
                  1,465
                </Text>
              </Flex>
            </Flex>
            <Box mx={{ sm: "auto", md: "0px" }}>
              <GradientProgress
                percent={70}
                viewport
                size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
                isGradient
                gradient={{
                  angle: 90,
                  startColor: "rgba(5, 205, 153, 0)",
                  stopColor: "#05CD99",
                }}
                emptyColor="transparent"
              >
                <Flex direction="column" justify="center" align="center">
                  <Text color="gray.400" fontSize="sm" mb="4px">
                    Safety
                  </Text>
                  <Text
                    color="#fff"
                    fontSize={{ md: "36px", lg: "50px" }}
                    fontWeight="bold"
                    mb="4px"
                  >
                    9.3
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    Total Score
                  </Text>
                </Flex>
              </GradientProgress>
            </Box>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}

export default DashBoardProcess;
