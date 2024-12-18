import type { Metadata } from 'next';

import type { ProjectDetailProps } from '~/lib/pages/project/detail/types';
import { getProjectBySlug } from '~/lib/services/content/project';
import { sznmOgImage } from '~/lib/utils/sznm-og-image';

export const generateMetadata = ({
  params,
}: ProjectDetailProps): Metadata | undefined => {
  const projectData = getProjectBySlug(params.id);

  if (!projectData) {
    return undefined;
  }

  return {
    title: projectData.title,
    alternates: {
      canonical: `/projects/${projectData.id}`,
    },
    openGraph: {
      title: `${projectData.title} | Agustinus Nathaniel`,
      images: {
        url: sznmOgImage({
          heading: projectData.title,
          text: 'https://agustinusnathaniel.com',
        }),
        alt: `${projectData.title} | Agustinus Nathaniel og-image`,
      },
    },
  };
};
