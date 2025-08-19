'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import ContactHeader from './ContactHeader'; // Assuming ContactHeader is created

const NavbarWrapper: React.FC = () => {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';

  return (
    <>
      {isContactPage ? <ContactHeader /> : <Navbar />}
    </>
  );
};

export default NavbarWrapper;
