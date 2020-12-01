import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const routing = (route) => {
  const router = useRouter();

  useEffect(() => {
    router.push(route);
  });
};

const AuthComponent = (WrappedComponent, Method) => ({
  userInfo,
  pageProps,
}) => {
  const hoc = <WrappedComponent userInfo={userInfo} {...pageProps} />;

  if (userInfo && Method === 'public') {
    routing('/');
  } else if (!userInfo && Method === 'private') {
    routing('/auth/signin');
  } else {
    return hoc;
  }

  return <div>Loading ...</div>;
};

export default AuthComponent;
