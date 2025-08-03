import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import Main from '../Components/Main';
import Aside from '../Components/Aside';
import Header from '../Components/Header';

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className='bg-[#FAF9FB] min-h-screen flex'>
      {/* Sidebar with right gap */}
      <div className='mr-4'>
        <Sidebar/>
      </div>
      
      {/* Main content area with gaps */}
      <div className='flex-1 flex flex-col'>
        {/* Header with bottom gap */}
        <div className='mb-4'>
          <Header/>
        </div>
        
        {/* Content area with gap between Main and Aside */}
        <div className='flex flex-1 gap-4'>
          {/* Main content with 70% width */}
          <div className='flex-[7]'>
            <Main/>
          </div>
          
          {/* Aside with 30% width */}
          <div className='flex-[3]'>
            <Aside/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard