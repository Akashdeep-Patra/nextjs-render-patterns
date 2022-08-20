import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { getPosts } from '../../../api';
import { IPost } from '../../../api/types';

interface ServerParams extends ParsedUrlQuery {
  id: string;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = (await getPosts()).data.data;

  return {
    props: {
      posts,
    },
  };
};
const ServerSideGeneration: NextPage<{
  posts: IPost[];
}> = ({ posts }) => {
  const router = useRouter();
  return (
    <div className='pl-5 flex gap-5 pt-5'>
      <div className='flex flex-col gap-2 h-[100vh] pl-5 capitalize w-[30%] justify-between overflow-y-auto'>
        {posts.map((post) => (
          <div
            onClick={() => router.push(`${post.id}`)}
            key={post.id}
            className=' bg-slate-500 cursor-pointer  rounded-sm p-5'
          >
            <span>{post.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerSideGeneration;
