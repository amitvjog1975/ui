import React, { useEffect } from 'react';
import NavMenu from '../components/NavMenu';
import { Outlet, useLocation } from 'react-router-dom';

const PublicLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const isHomePage = currentPath === '/' || currentPath === '/home';

    return (
        <div>
            <NavMenu />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default PublicLayout;