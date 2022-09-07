import { Suspense, useEffect, useState } from 'react';

import Page from '../components/Page.client';
import { getPostDataById, useData } from '../services';
import Post from '../components/Post.client';
import { getPosts } from '../services/index';
import { IPost } from '../services/types';
import Skeleton from '../components/Skeleton';

function PostWithData({ id }: { id: string }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useData(`s-${id}`, async () => await getPostDataById(id));
  if (typeof window === 'undefined' || !data) return <Skeleton count={1} />;

  return <Post post={data} />;
}

function PageWithData() {
  const { data: posts } = useData<Array<IPost>>(
    'stories',
    async () => (await getPosts()).data
  );
  return (
    <>
      {posts?.slice(0, 30).map((post: IPost) => {
        return (
          <Suspense key={post.id} fallback={<Skeleton count={1} />}>
            <PostWithData id={post.id} />
          </Suspense>
        );
      })}
    </>
  );
}

export default function News() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Page>
      {mounted && (
        <Suspense fallback={<Skeleton />}>
          <PageWithData />
        </Suspense>
      )}
    </Page>
  );
}
