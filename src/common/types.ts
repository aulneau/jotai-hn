export interface Post {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  type: PostType;
  content: string;
  comments: any[];
  comments_count: number;
  url: number | string;
  domain?: string;
}

export enum PostType {
  Link = 'link',
}
