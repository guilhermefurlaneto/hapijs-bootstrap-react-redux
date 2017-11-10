import Home from '../pages/Home';
import Dashboard from '../pages/dashboard/Dashboard';

export default [
    {
        id : 'app.home',
        path : '/',
        exact : true,
        component : Home,
    }, 
    {
        id : 'app.dashboard',
        path : '/dashboard',
        exact : true,
        component : Dashboard,
    }, 
];