import React from 'react';
import { useParams } from 'react-router-dom';
import { usePostsCollection } from '../../custom-hooks';
import { ImageGrid } from '../../components/ImageGrid';

const Explore = () => {
  const { tag } = useParams();

  const [posts] = usePostsCollection(null, tag);

  return (
    <>
      <h1>Explore #{tag}</h1>
      <h3>
        {posts.length} post{posts.length !== 1 && 's'}
      </h3>
      <ImageGrid posts={posts} />
    </>
  );
};

export default Explore;
