import React from 'react';
import { IPost } from '../api/types';
import Image from 'next/image';

export interface PostProps {
  post: IPost;
  placeholder: string;
}
const Post: React.FC<PostProps> = ({ post, placeholder }) => {
  return (
    <>
      <Image
        className='rounded-lg'
        src={post.image}
        alt='post-image'
        loading='lazy'
        width={500}
        height={400}
        placeholder='blur'
        blurDataURL={placeholder}
      />
      <h1 className=' text-2xl capitalize'>{post.text}</h1>
    </>
  );
};

export default Post;
