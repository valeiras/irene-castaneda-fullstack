import { Navbar } from '../components';
import { Outlet } from 'react-router-dom';
import Modal from '../components/FullpageImg';
import { adminSections } from '../data/sections';

const AdminLayout: React.FC = () => {
  return (
    <main>
      <Navbar sections={adminSections} />
      <div className="navbar-spacer"></div>
      <Outlet />
      <Modal />
    </main>
  );
};
export default AdminLayout;
