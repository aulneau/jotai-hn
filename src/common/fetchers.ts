import { BASE_URL, ITEM_URL } from '@common/constants';
import { Post } from '@common/types';

// @see https://github.com/jeffjadulco/hn/blob/6203d8a640596e7b1f8080111a89e498065b2554/src/services/items.js#L9

export async function getPostIds(limit = 20) {
  const ids = await fetch(`${BASE_URL}/topstories.json`).then(res => res.json());
  return ids.slice(0, limit);
}

function limitComments(comment) {
  if (!comment || comment.level > 5 || comment.deleted) return null;
  // Found this trick to filter null/undefined items: https://www.michaeluloth.com/filter-boolean
  comment.comments = comment.comments.map(limitComments).filter(Boolean);
  return comment;
}

export async function getPostData(id): Promise<Post | null> {
  const data = await fetch(`${ITEM_URL}/${id}.json`).then(res => res.json());

  if (data.type != 'job') {
    data.comments = [];
    if (data.url.startsWith('item?id=')) {
      data.url = data.id;
    }
    return data;
  }

  return null;
}

export async function getPostDataWithComments(id) {
  const data = await fetch(`${ITEM_URL}/${id}.json`)
    .then(res => res.json())
    .catch(e => {
      console.error(e);
    });

  if (!data) return null;

  if (data.url.startsWith('item?id=')) {
    data.url = data.id;
  }

  var comments = [];
  if (data.comments) {
    comments = data.comments.map(comment => limitComments(comment)).filter(Boolean);
  }

  data.comments = comments;
  return data;
}

export async function getPosts(limit = 20) {
  const postIds = await getPostIds(limit);
  const promises: Promise<Post | null>[] = postIds.map(async id => await getPostData(id));
  return Promise.all(promises);
}
