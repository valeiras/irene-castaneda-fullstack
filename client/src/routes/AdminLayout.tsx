/* eslint-disable react-refresh/only-export-components */
import { Navbar } from '../components';
import { Outlet, redirect } from 'react-router-dom';
import Modal from '../components/FullpageImg';
import { adminSections } from '../data/sections';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  try {
    await customFetch('auth/verifyAdmin');
    return 'ok';
  } catch (error) {
    return redirect('/login');
  }
};

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
