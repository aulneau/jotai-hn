import { atom } from 'jotai';
import { Post } from '@common/types';

export const postsAtom = atom<Post[] | null>(null);
export const currentPostIdAtom = atom<string | null>(null);
export const currentPostDataAtom = atom<Post | null>(null);
