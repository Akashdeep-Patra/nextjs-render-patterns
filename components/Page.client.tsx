import React from 'react';
import Header from './Header';

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='main px-10 py-10'>
        <Header />
        <div className='page'>{children}</div>
      </div>
    </>
  );
}
