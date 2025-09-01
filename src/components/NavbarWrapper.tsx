'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const NavbarWrapper: React.FC = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default NavbarWrapper;
