import { Box, Button } from "@chakra-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";

import ProjectDetailWrapper from "../../components/projects/ProjectDetailWrapper";

import { getAllProjectIds, getProjectData } from "../../helpers/projects";

import { ProjectType } from "../../models/project";

type ProjectProps = {
  projectData: ProjectType;
};

const Project = ({ projectData }: ProjectProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{projectData.title} | sznm.dev</title>
      </Head>
      <Box as="article">
        <Button
          leftIcon="arrow-back"
          size="sm"
          backgroundColor="teal.300"
          marginBottom={22}
          onClick={() => router.push("/projects")}
        >
          projects
        </Button>
        <ProjectDetailWrapper projectData={projectData} />
      </Box>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = getAllProjectIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const projectData = await getProjectData(params.id);
  return {
    props: { projectData },
  };
};

export default Project;
