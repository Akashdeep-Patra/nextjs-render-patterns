import { spawn } from 'child_process';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import { getPosts } from '../../../api';
import { IPost } from '../../../api/types';

export const getStaticProps: GetStaticProps<{
  posts: IPost[];
}> = async (context) => {
  const { data } = await getPosts();

  return {
    props: {
      posts: data.data,
    },
  };
};

const ServerSideGeneration: NextPage<{
  posts: IPost[];
}> = ({ posts }) => {
  return (
    <div>
      <div className=' flex flex-col gap-2 h-[100vh] py-5 pl-5 capitalize w-[30%] justify-between overflow-y-auto'>
        {posts.map((post) => (
          <div key={post.id} className=' bg-slate-500  rounded-sm p-5'>
            <Link className=' hover:text-sky-600' href={`posts/${post.id}`}>
              {post.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerSideGeneration;
