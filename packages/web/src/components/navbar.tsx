import Link from 'next/link';
import Image from 'next/image';

import { Container, Menu } from '../styles/components/Navbar';

const Navbar = ({ userInfo }) => {
  return (
    <Container>
      <Image src="/assets/logo.png" alt="logo" height="40" width="40"></Image>
      <Menu>
        <Link href="/cart">Cart</Link>
        {userInfo ? (
          <div>
            {userInfo.isAdmin && <Link href="/admin/dashboard">Dashboard</Link>}
            <Link href="/auth/signout">Logout</Link>
          </div>
        ) : (
          <div>
            <Link href="/auth/signin">Login</Link>
            <Link href="/auth/signup">Register</Link>
          </div>
        )}
      </Menu>
    </Container>
  );
};

export default Navbar;
