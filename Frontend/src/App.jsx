import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@fontsource/poppins';

import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Main from './Components/Main';
import Habits from './Pages/Habits';
import DashboardLayout from './Pages/DashboardLayout';
import Statistics from './Pages/Statistics';
import Calendar from './Pages/Calendar';
// import Settings from './Pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Layout routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Main />} />
          <Route path="habits" element={<Habits />} />
          <Route path="stats" element={<Statistics />} />
          <Route path="calendar" element={<Calendar />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
