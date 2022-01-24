import { Text } from "@chakra-ui/react";

import MotionBox from "lib/components/motion/MotionBox";
import MotionFlex from "lib/components/motion/MotionFlex";

import {
  socialLinks,
  staggerAnimationProps,
  wrapperAnimationProps,
} from "./constants";
import MotionLink from "./MotionLink";

const Links = () => {
  return (
    <MotionBox marginY={4} {...wrapperAnimationProps}>
      <Text fontStyle="italic">1.01 ^365 = 37.7</Text>

      <MotionFlex
        wrap="wrap"
        gridGap={4}
        marginTop={4}
        {...staggerAnimationProps}
      >
        {socialLinks.map((link) => (
          <MotionLink {...link} key={link.url} />
        ))}
      </MotionFlex>
    </MotionBox>
  );
};

export default Links;
