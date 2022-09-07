const Page = () => {
  return (
    <div className='container'>
      <h1>React Server Components in Next.js</h1>
      <h2>Without Streaming</h2>
      <section>
        <a href='/csr' target='_blank'>
          Static (Client Hydration) + Client Side Data Fetching
        </a>
      </section>
      <section>
        <a href='/ssr' target='_blank'>
          🐌 SSR with API Delays
        </a>
      </section>

      <section>
        <p>
          <small>This demo is built with Next.js</small>
        </p>
      </section>
    </div>
  );
};

export default Page;
