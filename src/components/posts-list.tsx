import React from 'react';
import { useAtomValue } from 'jotai/utils';
import { postsAtom } from '../store/posts';
import Link from 'next/link';

export const PostsList = ({ path = '' }) => {
  const posts = useAtomValue(postsAtom);

  return (
    <ul>
      {posts.map(post => {
        return (
          <li style={{ marginBottom: '12px' }}>
            <Link href={`${path}/${post.id}`} passHref>
              <a>{post.title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
