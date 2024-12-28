import { Routes, Route, useNavigate } from 'react-router-dom';

import PublicLayout from './layouts/Layout';
import Home from './components/Home';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import PrivateLayout from './layouts/PrivateLayout';
import Logout from './screens/Logout';
import DayAccountEoD from './screens/DayAccount/ShopAccountManager';
import UserContext, { UserProvider } from './shared/UserContext';
import { useContext, useEffect } from 'react';
import { LoaderProvider } from './shared/LoaderContext';


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day-account-eod" element={<DayAccountEoD />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}



export default App;
