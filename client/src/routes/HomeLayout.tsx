import { Navbar } from '../components';
import { Outlet } from 'react-router-dom';
import Modal from '../components/FullpageImg';
import { homeSections } from '../data/sections';

const HomeLayout: React.FC = () => {
  return (
    <main>
      <Navbar sections={homeSections} />
      <div className="navbar-spacer"></div>
      <Outlet />
      <Modal />
    </main>
  );
};
export default HomeLayout;
