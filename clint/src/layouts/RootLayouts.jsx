
import { Outlet } from 'react-router';
import NavBer from '../shared/NavBer';
import Footer from '../shared/Footer';

const RootLayouts = () => {
  return (
    <div>
      <NavBer></NavBer>
      <div className="min-h-[calc(100vh-309px)]">
        <Outlet />
      </div>

      <Footer></Footer>
    </div>
  );
};

export default RootLayouts;
