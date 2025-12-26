
import FooterSection from '../sections/footer-section';
import Navbar from '../sections/navbar';
import Footer from './Footer';
import { Outlet } from 'react-router';


function CommonLayout() {
  return (
    <div className=" min-h-screen flex flex-col">
      <Navbar />
      {/* <MainNavbar/> */}
      <div className="grow-1">
        <Outlet />{' '}
      </div>
      <Footer />
    </div>
  );
}

export default CommonLayout;
