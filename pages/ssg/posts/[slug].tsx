import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';
import { getPostDataById, getPosts } from '../../../api';
import { IPost } from '../../../api/types';

interface IParams extends ParsedUrlQuery {
  slug: string;
}
export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const { data } = await getPosts();
  return {
    paths: data.data.map((post) => ({
      params: {
        slug: post.id,
      },
    })),

    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context?.params as IParams;
  const { data } = await getPostDataById(slug);

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
