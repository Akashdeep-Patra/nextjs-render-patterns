import React from 'react';
export default function Skeleton({ count = 30 }) {
  // Generating {count = 30} skeletons to match the size of the list.
  return (
    <>
      {new Array(count).fill(0).map((_, index) => (
        <div key={index} className='flex w-full flex-1 flex-col items-center'>
          <div className='w-full animate-pulse flex-row items-center justify-center rounded-sm'>
            <div className='flex p-2 flex-col space-y-2'>
              <div className='h-2 w-full rounded-sm bg-gray-300 '></div>
              <div className='h-4 w-[78%] rounded-sm bg-gray-300 '></div>
              <div className='h-3 w-[90%] rounded-sm bg-gray-300 '></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
