import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";

import Card from "../components/Card";
import MotionFlex from "../components/motion/MotionFlex";
import MotionBox from "../components/motion/MotionBox";
import BlogPostPreview from "../components/blog/BlogPostPreview";

import { getSortedProjectsData } from "../helpers/projects";
import { getSortedPostsData } from "../helpers/posts";
import { ProjectType } from "../models/project";
import { BlogPostType } from "../models/blog";

type HomeProps = {
  allProjectsData: Array<ProjectType>;
  allPostsData: Array<BlogPostType>;
};

const Home = ({ allProjectsData, allPostsData }: HomeProps) => {
  return (
    <Box marginTop={-24}>
      <HeroSection />
      <ProjectsSection data={allProjectsData} />
      <RecentPostSection allPostsData={allPostsData} />
    </Box>
  );
};

const HeroSection = () => {
  return (
    <MotionBox
      variants={{
        before: { opacity: 0, y: 20, transition: { type: "spring" } },
        after: { opacity: 1, y: 0, transition: { type: "spring" } },
      }}
      initial="before"
      animate="after"
      height="90vh"
      alignItems="center"
      display="grid"
    >
      <Box display={["inherit", "flex"]}>
        <Box boxSize={[100, 160]}>
          <Image
            width={160}
            height={160}
            // className="glow"
            src="/avataaars.svg"
            alt="sozonome"
          />
        </Box>

        <Box
          verticalAlign="center"
          width={["100%", "80%", "60%"]}
          paddingX={[0, 22]}
          marginTop={[8, 0]}
          alignSelf={["none", "center"]}
        >
          <Heading as="h1" size="xl" paddingBottom={11}>
            Hello! I'm Nathan.
          </Heading>
          <Text fontSize={["md", "xl"]}>
            Digital crafter specializing in Frontend and Mobile development.
          </Text>
        </Box>
      </Box>
    </MotionBox>
  );
};

const ProjectsSection = ({ data }) => {
  const router = useRouter();

  const buttonBackgroundColor = useColorModeValue("gray.100", "gray.600");

  useEffect(() => {
    data
      .filter((project) => project.highlight && project)
      .map(({ id }) => {
        router.prefetch("/projects/[id]", `/projects/${id}`);
      });
  });

  return (
    <Box as="section" marginBottom={16}>
      <Box>
        <Box>
          <Link href="/projects">
            <Heading as="h1" size="xl" cursor="pointer" marginBottom={2}>
              Projects
            </Heading>
          </Link>
          <Text>Some notable projects I've worked on previously.</Text>
        </Box>

        <MotionFlex
          wrap="wrap"
          marginTop={22}
          variants={{
            before: {},
            after: { transition: { staggerChildren: 0.06 } },
          }}
          initial="before"
          animate="after"
        >
          {data
            .filter((project) => project.highlight && project)
            .map(({ id, title, thumbnail }, index) => {
              return (
                <Card
                  title={title}
                  handleClick={() =>
                    router.push("/projects/[id]", `/projects/${id}`)
                  }
                  img={thumbnail}
                  key={index}
                />
              );
            })}
        </MotionFlex>

        <Link href="/projects" passHref>
          <Button
            width="100%"
            borderRadius={20}
            height={55}
            backgroundColor={buttonBackgroundColor}
            _hover={{
              backgroundColor: "gray.300",
              color: "black",
            }}
            fontFamily="Catamaran, sans-serif"
          >
            see more
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

const RecentPostSection = ({ allPostsData }) => {
  const buttonBackgroundColor = useColorModeValue("gray.100", "gray.600");

  return (
    <Box as="section">
      <Heading size="xl" marginBottom={2}>
        Recent Posts
      </Heading>

      <MotionBox
        marginTop={22}
        variants={{
          before: {},
          after: { transition: { staggerChildren: 0.06 } },
        }}
        initial="before"
        animate="after"
      >
        {allPostsData
          .filter((post) => post.published === true)
          .slice(0, 2)
          .map((postData, index) => (
            <BlogPostPreview postData={postData} key={index} />
          ))}
      </MotionBox>

      <Link href="/blog" passHref>
        <Button
          isFullWidth
          width="100%"
          borderRadius={20}
          height={55}
          backgroundColor={buttonBackgroundColor}
          _hover={{
            backgroundColor: "gray.300",
            color: "black",
          }}
          fontFamily="Catamaran, sans-serif"
        >
          see more
        </Button>
      </Link>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allProjectsData: Array<ProjectType> = getSortedProjectsData();
  const allPostsData: Array<BlogPostType> = getSortedPostsData();

  return {
    props: {
      allProjectsData,
      allPostsData,
    },
  };
};

export default Home;
