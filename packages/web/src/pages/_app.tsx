import Head from 'next/head';

import client from '../api/client';
import GlobalStyle from '../styles/global';

const AppComponent = ({ Component, pageProps, userInfo }) => {
  return (
    <>
      <Head>
        <title>Koeki</title>
        <link rel="shortcut icon" href="/assets/logo.png" />
      </Head>
      <Component userInfo={userInfo} {...pageProps} />
      <GlobalStyle />
    </>
  );
};

AppComponent.getInitialProps = async (context) => {
  const buildClient = client(context.ctx);
  const { data } = await buildClient.get('/api/users/user-info');

  let pageProps = {};

  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(
      context.ctx,
      buildClient,
      data.userInfo,
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
