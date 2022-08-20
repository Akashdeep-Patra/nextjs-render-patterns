import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';
import { getPostDataById, getPosts } from '../../../api';
import { IPost } from '../../../api/types';

interface IParams extends ParsedUrlQuery {
  id: string;
}
export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const { data } = await getPosts();
  return {
    paths: data.data.map((post) => ({
      params: {
        id: post.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context?.params as IParams;
  const { data } = await getPostDataById(id);

  return {
    props: {
      post: data,
    },
  };
};

const ServerSideGeneration: NextPage<{ post: IPost }> = ({ post }) => {
  return (
    <div className=''>
      <Image
        src={post.image}
        alt='post-image'
        loading='lazy'
        width={200}
        height={200}
      />
    </div>
  );
};

export default ServerSideGeneration;
