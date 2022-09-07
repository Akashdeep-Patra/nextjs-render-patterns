import Link from 'next/link';
import { SiNextdotjs } from 'react-icons/si';
export default function Header() {
  return (
    <>
      <header className=' bg-teal-600 rounded-md p-4 flex justify-between'>
        <div className='left flex justify-between gap-5'>
          <Link href='/'>
            <a className='flex text-2xl items-center font-bold gap-5'>
              <span className='logo'>
                <SiNextdotjs />
              </span>
              <span className='site-title text-slate-50'>Next.js </span>
            </a>
          </Link>
          <div className='nav'></div>
        </div>
        <div className='right'>
          <span className='login font-bold text-xl text-slate-50'>
            On the Server
          </span>
        </div>
      </header>
    </>
  );
}
