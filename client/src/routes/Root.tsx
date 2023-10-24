import { Navbar } from '../components/';
import { Outlet } from 'react-router-dom';
import Modal from '../components/Modal';

const Root: React.FC = () => {
  return (
    <main>
      <Navbar />
      <div className="navbar-spacer"></div>
      <Outlet />
      <Modal />
    </main>
  );
};
export default Root;
