import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import Aside from '../Components/Aside';

function DashboardLayout() {
  return (
    <div className="bg-[#FAF9FB] min-h-screen flex">
      {/* Sticky Sidebar */}
      <div className="h-screen sticky top-0 z-10">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-6">
            {/* Main Content Center */}
            <div className="flex-[7]">
              <Outlet /> {/* Renders Main or Habits etc */}
            </div>

            {/* Aside Right */}
            <div className="flex-[3]">
              <Aside />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
