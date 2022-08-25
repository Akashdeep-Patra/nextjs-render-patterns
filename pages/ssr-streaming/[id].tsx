import React, { Suspense } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import { ParsedUrlQuery } from 'querystring';
import { getPostDataById, getPosts } from '../../api';
import { IPost } from '../../api/types';
import Post from '../../components/Post.client';

interface ServerParams extends ParsedUrlQuery {
  id: string;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context?.params as ServerParams;
  const posts = (await getPosts()).data.data;
  let post: IPost | null | 'not-found' = null;
  try {
    post = !id ? null : (await getPostDataById(id)).data;
  } catch (error) {
    post = 'not-found';
  }
  let placeholder: string = '';
  if (post && post !== 'not-found') {
    const { base64 } = await getPlaiceholder(post?.image, {
      size: 10,
    });
    placeholder = base64;
  }
  return {
    props: {
      post,
      placeholder,
      posts,
    },
  };
};

const ServerSideGeneration: NextPage<{
  post: IPost | null | 'not-found';
  posts: IPost[];
  placeholder: string;
}> = ({ post, posts, placeholder }) => {
  const router = useRouter();
  return (
    <div className='pl-5 flex gap-5 pt-5'>
      <div className='flex flex-col gap-2 h-[100vh] pl-5 capitalize w-[30%] justify-between overflow-y-auto'>
        {posts.map((post) => (
          <Suspense key={post.id} fallback='Loading...'>
            <div
              onClick={() => router.push(`${post.id}`)}
              className=' bg-slate-500 cursor-pointer  rounded-sm p-5'
            >
              <span>{post.text}</span>
            </div>
          </Suspense>
        ))}
      </div>
      {post && post !== 'not-found' ? (
        <div className=''>
          <Post post={post} placeholder={placeholder} />
        </div>
      ) : (
        <div className='w-full flex justify-center items-center'>
          <h1 className=' text-3xl'>This Post does not exist</h1>
        </div>
      )}
    </div>
  );
};

export default ServerSideGeneration;
