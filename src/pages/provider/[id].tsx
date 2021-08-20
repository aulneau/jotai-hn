import { getPostDataWithComments, getPosts } from '@common/fetchers';
import { currentPostDataAtom, currentPostIdAtom, postsAtom } from '../../store/posts';
import { useCurrentPost } from '@hooks/use-current-post';
import { useAdjacentPosts } from '@hooks/use-adjacent-posts';
import Link from 'next/link';
import React from 'react';
import { Provider } from 'jotai';

const Pagination = () => {
  const { previous, next } = useAdjacentPosts();
  return (
    <div>
      {previous && (
        <Link href={`/provider/${previous.id}`} passHref>
          <a>previous post</a>
        </Link>
      )}
      {next && (
        <Link href={`/provider/${next.id}`} passHref>
          <a>next post</a>
        </Link>
      )}
    </div>
  );
};

const PageTitle = () => {
  const { post } = useCurrentPost();
  return <h1>{post.title}</h1>;
};

const PostPage = ({ posts, data, id }) => {
  return (
    <Provider
      initialValues={[
        [postsAtom, posts],
        [currentPostIdAtom, id],
        [currentPostDataAtom, data],
      ]}
      key={id}
    >
      <div>
        <header>
          <PageTitle />
        </header>
        <main>
          <Pagination />
        </main>
      </div>
    </Provider>
  );
};

export async function getServerSideProps({ params }) {
  const data = await getPostDataWithComments(params.id);
  const posts = await getPosts(20);

  if (!data) {
    console.warn(`Can't find post data with id=${params.id}`);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      posts,
      id: params.id,
    },
  };
}

export default PostPage;
