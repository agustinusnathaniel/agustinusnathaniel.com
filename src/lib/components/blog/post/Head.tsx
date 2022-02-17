import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";

import Twemoji from "lib/components/Twemoji";
import type { BlogPostType } from "lib/types/blog";
import { dateFormatLong } from "lib/utils/dateFormat";

type BlogPostHeadProps = {
  postData: BlogPostType;
};

const BlogPostHead = ({ postData }: BlogPostHeadProps) => {
  return (
    <Flex alignItems="center" marginBottom={16}>
      <Box flexBasis={["80%"]}>
        <Heading as="h1" size="2xl" marginBottom={8}>
          {postData.title}
        </Heading>
        <Link href="/about" isExternal>
          <Text>Agustinus Nathaniel</Text>
        </Link>

        <Text>{dateFormatLong(postData.date)}</Text>
      </Box>

      <Flex flexBasis={["20%"]}>
        <Box marginLeft="auto" width="60%">
          <Twemoji emoji={postData.thumbnail ?? "📘"} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default BlogPostHead;