import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LeadsPage from './pages/Leads';
import ContactsPage from './pages/Contacts';
import Accounts from './pages/Accounts';
import Opportunities from './pages/Opportunities';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Meetings from './pages/Meetings';
import PipelineReport from './pages/Pipline';
import ForecastReport from './pages/Forcast';
import ActivityLogs from './pages/Activity';
import Page from './settings/page';
import RegisterPage from './pages/Register';
import LoginPage from './pages/LogIn';
import ProfilePage from './pages/Profile';
import AddUser from './components/AddUser'
import ViewUser from './components/ViewUser'
import Demo from './components/Demo'
import Demo2 from './components/Demo2'
import Demo3 from './components/Demo3'
import CustomContacts from './myComponents/CustomContacts';

import { ThemeProvider } from './contextAPI/contextTheme/ThemeContext';
import { AuthProvider } from './contextAPI/contextAuth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideNavbarOn = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
}

function AppRoutes() {
  return (
    <LayoutWrapper>
      <AuthProvider>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/demo' element={<Demo/>} />
          <Route path='/demo2' element={<Demo2 />} />
          <Route path='/demo3' element={<Demo3 />} />



          <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/leads' element={<ProtectedRoute><LeadsPage /></ProtectedRoute>} />
          <Route path='/contacts' element={<ProtectedRoute><ContactsPage /></ProtectedRoute>} />
          <Route path='/accounts' element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path='/opportunities' element={<ProtectedRoute><Opportunities /></ProtectedRoute>} />
          <Route path='/activities/tasks' element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path='/activities/calendar' element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path='/activities/meetings' element={<ProtectedRoute><Meetings /></ProtectedRoute>} />
          <Route path='/reports/pipeline' element={<ProtectedRoute><PipelineReport /></ProtectedRoute>} />
          <Route path='/reports/forecast' element={<ProtectedRoute><ForecastReport /></ProtectedRoute>} />
          <Route path='/reports/activity' element={<ProtectedRoute><ActivityLogs /></ProtectedRoute>} />
          <Route path='/settings' element={<ProtectedRoute><Page /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path='/add_user' element={<ProtectedRoute><AddUser/></ProtectedRoute>} />
          <Route path='/view_user' element={<ProtectedRoute><ViewUser/></ProtectedRoute>} />
          <Route path='/custom_contacts' element={<ProtectedRoute><CustomContacts/></ProtectedRoute>} />
          

        </Routes>
      </AuthProvider>
    </LayoutWrapper>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className='bg-[#FCF7E3]'>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
