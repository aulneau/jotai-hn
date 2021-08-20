import Link from 'next/link';
import { getPostDataWithComments, getPosts } from '@common/fetchers';
import { useHydrateAtoms, useUpdateAtom } from 'jotai/utils';
import { currentPostDataAtom, currentPostIdAtom, postsAtom } from '../store/posts';
import { useCurrentPost } from '@hooks/use-current-post';
import { useAdjacentPosts } from '@hooks/use-adjacent-posts';
import { useEffect } from 'react';

const Pagination = () => {
  const { previous, next } = useAdjacentPosts();
  return (
    <div>
      {previous && (
        <Link href={`/${previous.id}`} passHref>
          <a>previous post</a>
        </Link>
      )}
      {next && (
        <Link href={`/${next.id}`} passHref>
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

const PageInner = ({ posts, data, id }) => {
  useHydrateAtoms([
    [postsAtom, posts],
    [currentPostIdAtom, id],
    [currentPostDataAtom, data],
  ]);

  useEffect(() => {}, []);
  return (
    <div>
      <header>
        <PageTitle />
      </header>
      <main>
        <Pagination />
      </main>
    </div>
  );
};

const PostPage = ({ posts, data, id }) => {
  return <PageInner data={data} posts={posts} id={id} key={id} />;
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

// This does work for client side updates
// const PageInnerWithEffect = ({ posts, data, id }) => {
//   useHydrateAtoms([
//     [postsAtom, posts],
//     [currentPostIdAtom, id],
//     [currentPostDataAtom, data],
//   ]);
//
//   const updateCurrentPostId = useUpdateAtom(currentPostIdAtom as any);
//   const updateCurrentDataId = useUpdateAtom(currentPostDataAtom as any);
//
//   useEffect(() => {
//     updateCurrentPostId(id);
//     updateCurrentDataId(data);
//   }, [id, data]);
//
//   return (
//     <div>
//       <header>
//         <PageTitle />
//       </header>
//       <main>
//         <Pagination />
//       </main>
//     </div>
//   );
// };
