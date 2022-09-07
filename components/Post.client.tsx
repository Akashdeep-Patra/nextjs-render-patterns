import { useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { IPost } from '../services/types';







export default function Post({ post }: { post: IPost }) {
  const [voted, setVoted] = useState(false);
  const { text, owner, likes, tags, id } = post;
  const [likeCount, setLikeCount] = useState(likes);
  return (
    <div className=' shadow-2xl  bg-slate-100 px-3 mt-5 rounded-md py-3 hover:scale-[101%] duration-[500] relative transition-all'>
      <div className='flex items-end gap-3'>
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          className=' w-[50px] rounded-[50%] shadow-lg'
          src={owner.picture}
          alt={owner.title}
        />
        <div className=' flex flex-col'>
          <h1 className='text-xl capitalize font-semibold'>{text}</h1>
          <h3>{`${owner.firstName} ${owner.lastName}`}</h3>
          <p className=' m-0 text-teal-600 font-semibold capitalize'>
            Tags: {tags.join(',')}
          </p>
        </div>
      </div>
      <div className=' flex items-end cursor-pointer gap-2 absolute right-2 bottom-2'>
        {voted && (
          <FcLike
            size={50}
            onClick={() => {
              setLikeCount(likeCount - 1);
              setVoted(false);
            }}
          />
        )}
        {!voted && (
          <FcLikePlaceholder
            size={50}
            onClick={() => {
              setLikeCount(likeCount + 1);
              setVoted(true);
            }}
          />
        )}
        <div className=' capitalize font-bold'> {likeCount}</div>
      </div>
    </div>
  );
}
