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
import { ThemeProvider } from './contextAPI/contextTheme/ThemeContext';

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
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/leads' element={<LeadsPage />} />
        <Route path='/contacts' element={<ContactsPage />} />
        <Route path='/accounts' element={<Accounts />} />
        <Route path='/opportunities' element={<Opportunities />} />
        <Route path='/activities/tasks' element={<Tasks />} />
        <Route path='/activities/calendar' element={<Calendar />} />
        <Route path='/activities/meetings' element={<Meetings />} />
        <Route path='/reports/pipeline' element={<PipelineReport />} />
        <Route path='/reports/forecast' element={<ForecastReport />} />
        <Route path='/reports/activity' element={<ActivityLogs />} />
        <Route path='/settings' element={<Page />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
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
