import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import { ParsedUrlQuery } from 'querystring';
import { getPostDataById, getPosts } from '../../../api';
import { IPost } from '../../../api/types';
import Post from '../../../components/Post.client';

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
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
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
            className=' bg-slate-500 cursor-pointer  rounded-sm p-5'
          >
            <span>{post.text}</span>
          </div>
        ))}
      </div>
      <div className=''>
        {post && <Post post={post} placeholder={placeholder} />}
      </div>
    </div>
  );
};

export default ServerSideGeneration;
