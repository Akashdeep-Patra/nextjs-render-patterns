import Page from '../components/Page.client';

const Home = () => {
  return (
    <Page>
      <div className='container'>
        <h1>SSR in Next.js</h1>
        <h2>Without Streaming</h2>
        <section>
          <a href='/csr' target='_blank'>
            Static Site generation (Client Hydration) + Client Side Data
            Fetching
          </a>
        </section>
        <section>
          <a href='/ssr' target='_blank'>
            🐌 SSR with Client Hydration
          </a>
        </section>

        <section>
          <p>
            <small>This demo is built with Next.js</small>
          </p>
        </section>
      </div>
    </Page>
  );
};

export default Home;
