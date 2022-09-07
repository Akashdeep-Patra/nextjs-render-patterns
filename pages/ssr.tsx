import { GetServerSideProps, NextPage } from 'next';
import Page from '../components/Page.client';
import Post from '../components/Post.client';
import { getPostDataById, getPosts } from '../services';
import { IPost } from '../services/types';

export const getServerSideProps = async () => {
  const posts = await (await getPosts()).data;
  const data = await Promise.all(
    posts.slice(0, 30).map((post) => getPostDataById(post.id))
  );
  return {
    props: {
      data,
    },
  };
};

const ServerPage: NextPage<{ data: IPost[] }> = ({ data }) => {
  return (
    <Page>
      {data.map((post, i) => {
        return <Post key={i} post={post} />;
      })}
    </Page>
  );
};

export default ServerPage;
