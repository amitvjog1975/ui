import React from 'react';
import NavMenu from '../components/NavMenu';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
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