import { Box, Link, Text } from "@chakra-ui/react";

import { responsiveWidthProps } from "../../styles/customTheme";

const Footer = () => {
  return (
    <Box as="footer" width="full" marginBottom={12} {...responsiveWidthProps}>
      <Text fontSize="sm">
        2020 - 2021 |{" "}
        <Link
          href="https://agustinusnathaniel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          AgustinusNathaniel
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
