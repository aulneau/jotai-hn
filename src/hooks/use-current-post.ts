import { useAtomValue } from 'jotai/utils';
import { currentPostDataAtom, currentPostIdAtom } from '../store/posts';

export function useCurrentPost() {
  const id = useAtomValue(currentPostIdAtom);
  const post = useAtomValue(currentPostDataAtom);

  return { id, post };
}
