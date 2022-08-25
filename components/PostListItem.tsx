import React, { Suspense } from 'react';
import { IPost } from '../api/types';
import { useRouter } from 'next/router';

const PostListItem: React.FC<{ post: IPost }> = ({ post }) => {
  const router = useRouter();
  return (
    <Suspense key={post.id} fallback='Loading...'>
      <div
        onClick={() => router.push(`posts/${post.id}`)}
        key={post.id}
        className=' bg-slate-500 cursor-pointer  rounded-sm p-5'
      >
        <span>{post.text}</span>
      </div>
    </Suspense>
  );
};

export default PostListItem;
