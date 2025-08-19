import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import FloatingButton from './components/FloatingButton';

export default function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 140px)' }}>
        <Outlet />
      </div>
      <FloatingButton />
    </>
  );
}
