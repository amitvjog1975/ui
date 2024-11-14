// Layouts
import PublicLayout from "../../layouts/Layout";
import PrivateLayout from "../../layouts/PrivateLayout";

// Pages
import Login from "../../screens/Login";
import Dashboard from "../../screens/Dashboard";
import ProfileHome from "../../screens/Profile/ProfileHome";

export const routes = [
    {
        layout: PublicLayout,
        routes: [
            {
                name: 'login',
                title: 'Login page',
                component: Login,
                path: '/login',
                isPublic: true,
            }
        ]
    },
    {
        layout: PrivateLayout,
        routes: [
            {
                name: 'dashboard',
                title: 'Dashboard',
                component: Dashboard,
                path: '/dashoard'
            },
            {
                name: 'profilehome',
                title: 'Profile',
                hasSiderLink: true,
                routes: [
                    {
                        name: 'profile-home',
                        title: 'Profile Home',
                        hasSiderLink: true,
                        component: ProfileHome,
                        path: '/profile'
                    },
                    {
                        name: 'create-user',
                        title: 'Add user',
                        hasSiderLink: true,
                        component: ProfileHome,
                        path: '/users/new'
                    }
                ]
            }
        ]
    }
];