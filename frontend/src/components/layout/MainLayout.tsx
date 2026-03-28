import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-legal-light text-legal-dark font-sans pb-20 lg:pb-0">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default MainLayout;
