import React from 'react';
import { getPosts } from '@common/fetchers';
import { useHydrateAtoms } from 'jotai/utils';
import { postsAtom } from '../store/posts';
import { PostsList } from '@components/posts-list';

const HomePage = ({ data }) => {
  useHydrateAtoms([[postsAtom, data]]);

  return (
    <div>
      <header>
        <h1>Jotai HN</h1>
      </header>
      <main>
        <PostsList />
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const posts = await getPosts();
  const data = posts.filter(Boolean);

  return {
    props: {
      data,
    },
  };
}

export default HomePage;
