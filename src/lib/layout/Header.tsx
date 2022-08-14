import { Box, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import { RiCommandFill } from "react-icons/ri";

import CommandMenu from "lib/components/commands";
import { useCmdMenu } from "lib/store/cmd";
import { trackEvent } from "lib/utils/trackEvent";

import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { openCmdMenu } = useCmdMenu((state) => ({
    openCmdMenu: state.openCmdMenu,
  }));

  const handleOpenCommandCenter = () => {
    trackEvent({
      eventValue: "open cmd center",
      eventType: "cta",
    });
    openCmdMenu();
  };

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={0}
        zIndex={5}
        backgroundColor="headerAlphaBackground"
        layerStyle="blur-bg"
        width="full"
      >
        <Flex layerStyle="layoutBlock" alignItems="center">
          <Link href="/" passHref>
            <Text as="a" cursor="pointer" fontSize={["md", "xl"]}>
              sznm.dev
            </Text>
          </Link>

          <Spacer />

          <Flex alignItems="center" gap={4}>
            <Flex display={["none", "flex"]}>
              <Navigation />
            </Flex>

            <Flex gap={2}>
              <IconButton
                aria-label="command-center"
                icon={<RiCommandFill />}
                backgroundColor="transparent"
                onClick={handleOpenCommandCenter}
              />
              <ThemeToggle />
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <CommandMenu />
    </>
  );
};

export default Header;
