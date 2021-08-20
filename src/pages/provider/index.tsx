import React from 'react';
import { getPosts } from '@common/fetchers';
import { postsAtom } from '../../store/posts';
import { PostsList } from '@components/posts-list';
import { Provider } from 'jotai';

const HomePage = ({ data }) => {
  return (
    <Provider initialValues={[[postsAtom, data]]}>
      <div>
        <header>
          <h1>Jotai HN</h1>
        </header>
        <main>
          <PostsList path={'provider'} />
        </main>
      </div>
    </Provider>
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
