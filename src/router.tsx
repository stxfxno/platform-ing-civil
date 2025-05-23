import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';

// RFIs
import RFIsMenu from './pages/rfis/RFIsMenu';
import CreateRFI from './pages/rfis/CreateRFI';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            // RFIs Routes
            {
                path: 'rfis',
                children: [
                    { index: true, element: <RFIsMenu /> },
                    { path: 'crear', element: <CreateRFI /> },
                ],
            },
            // Programación Semanal Routes
            {
                path: 'programacion-semanal',
                children: [
                ],
            },
            // Alcance Routes
            {
                path: 'alcance',
                children: [
                ],
            },
            // Cronogramas Routes
            {
                path: 'cronogramas',
                children: [
                ],
            },
            // Documentación Routes
            {
                path: 'documentacion',
                children: [
                ],
            },
            // Mensajes Routes
            {
                path: 'mensajes',
                children: [
                ],
            },
        ],
    },
]);