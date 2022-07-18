import '../styles/global.css';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import NProgress from 'nprogress';
import Router from 'next/router';
import nookies from 'nookies';
import * as React from 'react';
import PropTypes from 'prop-types';
import { wrapper } from '../store/store';

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

function MyApp(props) {
  const { Component, pageProps } = props;

  const router = useRouter();

  const handleLogout = () => {
    nookies.destroy(null, 'user_token');
    router.push('/login');
  };

  if (Component.getLayout) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout handleLogout={handleLogout}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
