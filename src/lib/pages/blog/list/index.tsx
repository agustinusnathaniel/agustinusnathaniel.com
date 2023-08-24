'use client';

import { Heading, Box, Text, Grid } from '@chakra-ui/react';
import debounce from 'lodash-es/debounce';
import * as React from 'react';

import BlogPostCard from '~/lib/components/blog/BlogPostCard';
import MotionGrid from '~/lib/components/motion/MotionGrid';
import PostSearch from '~/lib/components/shared/PostSearch';
import {
  childAnimationProps,
  staggerAnimationProps,
} from '~/lib/constants/animation';
import { sortedBlogPosts } from '~/lib/constants/blog';

const BlogPostList = () => {
  const [keyword, setKeyword] = React.useState<string>('');

  const filteredPosts = sortedBlogPosts.filter((post) =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeKeyword = React.useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    }, 150),
    []
  );

  return (
    <Box>
      <Grid marginBottom={22} gap={2}>
        <Heading as="h1" size="xl">
          Blog Posts
        </Heading>
        <Text>Just some writings</Text>
      </Grid>

      <PostSearch
        keyword={keyword}
        onChange={handleChangeKeyword}
        placeholder="Search Post"
      />

      <MotionGrid
        gap={16}
        marginY={12}
        gridTemplateColumns={{ md: 'repeat(2, 1fr)' }}
        {...staggerAnimationProps}
      >
        {!filteredPosts.length && <Text>No posts found.</Text>}
        {filteredPosts.map((postData) => (
          <BlogPostCard
            wrapperProps={childAnimationProps}
            postData={postData}
            key={postData.title}
          />
        ))}
      </MotionGrid>
    </Box>
  );
};

export default BlogPostList;
