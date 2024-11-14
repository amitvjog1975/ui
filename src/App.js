import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/Layout';
import Home from './components/Home';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import PrivateLayout from './layouts/PrivateLayout';
import Logout from './screens/Logout';
import ShopAccountManager from './screens/EOD_Account/ShopAccountManager';


function App() {
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
          <Route path="/eod-activity" element={<ShopAccountManager />} />
        </Route>

      </Routes>
  );
}

export default App;
