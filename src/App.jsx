import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar'
import Header from './components/Header'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
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
import Leads from './pages/Leads1';
function App() {

  return (
    <>
     <div className='bg-[#FCF7E3]'>
      <BrowserRouter>
      <Navbar/>

      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/leads' element={<LeadsPage/>}/>
      <Route path='/contacts' element={<ContactsPage/>}/>
      <Route path='/accounts' element={<Accounts/>}/>
      <Route path='/opportunities' element={<Opportunities/>}></Route>
      <Route path='/activities/tasks' element={<Tasks/>}></Route>
      <Route path='/activities/calendar' element={<Calendar/>}></Route>
      <Route path='/activities/meetings' element={<Meetings/>}></Route>
      <Route path='/reports/pipeline' element={<PipelineReport/>}></Route>
      <Route path='/reports/forecast' element={<ForecastReport/>}></Route>
      <Route path='/reports/activity' element={<ActivityLogs/>}></Route>
      <Route path='/leads-1' element={<Leads/>}></Route>

      </Routes>
     </BrowserRouter>

     </div>
    </>
  )
}

export default App
