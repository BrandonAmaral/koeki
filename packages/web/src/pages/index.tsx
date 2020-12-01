import Head from 'next/head';

import Navbar from '../components/navbar';

const Index = ({ userInfo }) => {
  return (
    <div>
      <Navbar userInfo={userInfo} />
      <h1>Home</h1>
    </div>
  );
};

export default Index;
