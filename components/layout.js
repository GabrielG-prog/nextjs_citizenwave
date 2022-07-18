import Head from 'next/head';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function Layout({ children, handleLogout }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Citizenwave admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Admin for web app citizenwave" />
      </Head>

      <Sidebar handleLogout={handleLogout} />
      <div className="relative md:ml-64 bg-cyan-200">
        <Navbar handleLogout={handleLogout} />
        <div className="relative bg-cyan-200 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
