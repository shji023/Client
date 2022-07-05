import React from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import LineChart from "components/Charts/LineChart";
// Variables
import { lineChartData, lineChartOptions } from "variables/charts";
function DashBoardGraph() {
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const { colorMode } = useColorMode();
  return (
    <div>
      <Card
        bg={
          colorMode === "dark"
            ? "navy.800"
            : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
        }
        p="0px"
        maxW={{ sm: "320px", md: "100%" }}
      >
        <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
          <Text color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
            Sales Overview
          </Text>
          <Text color="#fff" fontSize="sm">
            <Text as="span" color="green.400" fontWeight="bold">
              (+5) more{" "}
            </Text>
            in 2022
          </Text>
        </Flex>
        <Box minH="300px">
          <LineChart chartData={lineChartData} chartOptions={lineChartOptions} />
        </Box>
      </Card>
    </div>
  );
}

export default DashBoardGraph;
