import { useAtomValue } from 'jotai/utils';
import { currentPostDataAtom, currentPostIdAtom, postsAtom } from '../store/posts';
import { useCurrentPost } from '@hooks/use-current-post';

export function useAdjacentPosts() {
  const current = useCurrentPost();
  const posts = useAtomValue(postsAtom);
  const index = posts.findIndex(item => item?.id === parseInt(current.id || '0'));

  return {
    previous: index - 1 >= 0 ? posts[index - 1] : null,
    next: index + 1 <= posts.length - 1 ? posts[index + 1] : null,
  };
}
