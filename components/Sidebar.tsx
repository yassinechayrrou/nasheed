import {
  Box,
  Flex,
  List,
  ListItem,
  ListIcon,
  LinkBox,
  LinkOverlay,
  Divider,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import {
  MdOutlineQueueMusic,
  MdHomeFilled,
  MdSearch,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const navigationMenu = [
  {
    label: "Home",
    icon: MdHomeFilled,
    route: "/",
  },
  {
    label: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    label: "Your Library",
    icon: MdOutlineQueueMusic,
    route: "/library",
  },
];

const audioMenu = [
  {
    label: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    label: "Liked Nasheed",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const mockList = Array(50).fill({ name: "playlist", route: "/" });

const Sidebar = () => {
  return (
    <Box
      bg="black"
      fontSize="14px"
      fontWeight="bold"
      textColor="lightgray"
      width="100%"
      height="100%"
    >
      <Flex
        flexDirection="column"
        marginX=".4rem"
        paddingTop="1.5rem"
        height="100%"
      >
        <Box margin="0 auto">
          <NextImage src="/logo.svg" height={40} width={170} />
        </Box>
        <Box marginTop="3rem" marginLeft=".8rem">
          <List spacing={2}>
            {navigationMenu.map((menu) => (
              <ListItem key={menu.label}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="gray.500"
                        fontSize="20px"
                        marginRight="1rem"
                      />
                      {menu.label}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginTop="2.5rem" marginLeft=".8rem">
          <List spacing={2}>
            {audioMenu.map((menu) => (
              <ListItem key={menu.label}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="gray.500"
                        fontSize="20px"
                        marginRight="1rem"
                      />
                      {menu.label}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider marginTop="1.5rem" />
        <Box
          height="100%"
          marginLeft=".8rem"
          overflowY="scroll"
          sx={{
            "::-webkit-scrollbar": {
              width: "4px",
            },
            "::-webkit-scrollbar-track": {
              width: "6px",
            },
            "::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "24px",
            },
          }}
        >
          <List spacing={2}>
            {mockList.map((item, idx) => (
              <ListItem key={`${item.name}_${idx}`}>
                <LinkBox>
                  <NextLink href={item.route} passHref>
                    <LinkOverlay>{`${item.name} ${idx}`}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Flex>
    </Box>
  );
};
export default Sidebar;
