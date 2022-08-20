import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import { ParsedUrlQuery } from 'querystring';
import { getPostDataById, getPosts } from '../../../api';
import { IPost } from '../../../api/types';

interface IParams extends ParsedUrlQuery {
  id: string[];
}
export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const { data } = await getPosts();
  return {
    paths: [
      ...data.data.map((post) => ({
        params: {
          id: [post.id],
        },
      })),
      {
        params: {
          id: [''],
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context?.params as IParams;
  const posts = (await getPosts()).data.data;
  const post = !id ? null : (await getPostDataById(id?.[0])).data;
  let placeholder: string = '';
  let imageProps;
  if (post) {
    const { base64, img } = await getPlaiceholder(post?.image, {
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
  post: IPost;
  posts: IPost[];
  placeholder: string;
}> = ({ post, posts, placeholder }) => {
  const router = useRouter();
  return (
    <div className='pl-5 flex gap-5 pt-5'>
      <div className='flex flex-col gap-2 h-[100vh] pl-5 capitalize w-[30%] justify-between overflow-y-auto'>
        {posts.map((post) => (
          <div
            onClick={() => router.push(`${post.id}`)}
            key={post.id}
            className=' bg-slate-500  rounded-sm p-5'
          >
            <span className=' cursor-pointer'>{post.text}</span>
          </div>
        ))}
      </div>
      <div className=''>
        {post && (
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
        )}
      </div>
    </div>
  );
};

export default ServerSideGeneration;
