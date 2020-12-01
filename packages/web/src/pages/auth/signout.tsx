import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

import authRouting from '../../components/authRouting';

const SignOut = () => {
  const { makeRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    makeRequest();
  }, []);

  return <div>Signing out ...</div>;
};

export default authRouting(SignOut, 'private');
