import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <Flex width="100vw" height="100vh" flexDir="column">
      <Flex overflow="hidden">
        <Box width="250px">
          <Sidebar />
        </Box>
        <Box width="100%" overflowY="scroll">
          {children}
        </Box>
      </Flex>
      <Box bg="gray.300" height="100px" width="100%" textAlign="center">
        player
      </Box>
    </Flex>
  );
};

export default AppLayout;
