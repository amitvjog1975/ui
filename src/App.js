import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import PublicLayout from './layouts/Layout';
import PrivateLayout from './layouts/PrivateLayout';
import Home from './components/Home';
import Login from './screens/Login';
import Logout from './screens/Logout';
import DayAccountEoD from './screens/DayAccount/DayAccountEOD';
import { UserProvider } from './shared/UserContext';
import UserContext from './shared/UserContext';
import { LoaderProvider } from './shared/LoaderContext';
import Dashboard from './screens/Dashboard/Dashboard';

function AppRoutes() {

  return (
    <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day-account-eod/:eodShopID/:eodAccountDate" element={<DayAccountEoD />} />
        </Route>
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <LoaderProvider>
        <AppRoutes />
      </LoaderProvider>
    </UserProvider>
  );
}

export default App;