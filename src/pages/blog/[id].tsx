import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

import { renderers } from "../../components/blog/renderers";

import { getAllPostIds, getPostData } from "../../helpers/posts";
import { dateFormatLong } from "../../helpers/dateFormat";

import { BlogPostType } from "../../models/blog";

import styles from "./[id].module.scss";
import MotionBox from "../../components/motion/MotionBox";

type BlogPostProps = {
  postData: BlogPostType;
};

const BlogPost = ({ postData }: BlogPostProps) => {
  return (
    <MotionBox
      variants={{
        before: { opacity: 0, y: 20, transition: { type: "spring" } },
        after: { opacity: 1, y: 0, transition: { type: "spring" } },
      }}
      initial="before"
      animate="after"
    >
      <Head>
        <title>{postData.title} | sozonome</title>
      </Head>
      <Flex alignItems="center" marginBottom={8}>
        <Box flexBasis={["80%"]}>
          <Heading size="2xl" marginBottom={2}>
            {postData.title}
          </Heading>
          <Text>{dateFormatLong(postData.date)}</Text>
        </Box>
        <Flex flexBasis={["20%"]}>
          <Box marginLeft="auto" width="60%">
            <Image src={postData.thumbnail} unsized />
          </Box>
        </Flex>
      </Flex>
      <ReactMarkdown
        className={styles.content}
        children={postData.rawContent}
        renderers={renderers}
        allowDangerousHtml
      />
    </MotionBox>
  );
};

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);
  return {
    props: { postData },
  };
};

export default BlogPost;
