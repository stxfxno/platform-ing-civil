import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';

// RFIs
import RFIsMenu from './pages/rfis/RFIsMenu';
import CreateRFI from './pages/rfis/CreateRFI';

// Páginas placeholder temporales
const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">Página en construcción...</p>
    </div>
);

// Wrapper component to provide AuthContext
function RootLayout({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RootLayout>
                <App />
            </RootLayout>
        ),
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
                    { path: 'bandeja', element: <PlaceholderPage title="Bandeja de RFIs" /> },
                    { path: 'historial', element: <PlaceholderPage title="Historial de RFIs" /> },
                ],
            },
            // Programación Semanal Routes
            {
                path: 'programacion-semanal',
                children: [
                    { index: true, element: <PlaceholderPage title="Programación Semanal" /> },
                    { path: 'actividades', element: <PlaceholderPage title="Gestión de Actividades" /> },
                    { path: 'seguimiento', element: <PlaceholderPage title="Seguimiento de Progreso" /> },
                    { path: 'dependencias', element: <PlaceholderPage title="Dependencias y Coordinación" /> },
                    { path: 'reportes-subcontratistas', element: <PlaceholderPage title="Reportes de Subcontratistas" /> },
                ],
            },
            // Alcance Routes
            {
                path: 'alcance',
                children: [
                    { index: true, element: <PlaceholderPage title="Gestión del Alcance" /> },
                    { path: 'repositorio', element: <PlaceholderPage title="Repositorio de Documentos" /> },
                    { path: 'licitaciones', element: <PlaceholderPage title="Paquetes de Licitación MEP" /> },
                    { path: 'clarificaciones', element: <PlaceholderPage title="Clarificaciones del Alcance" /> },
                    { path: 'qa', element: <PlaceholderPage title="Módulo Q&A" /> },
                ],
            },
            // Cronogramas Routes
            {
                path: 'cronogramas',
                children: [
                    { index: true, element: <PlaceholderPage title="Cronogramas" /> },
                    { path: 'maestro', element: <PlaceholderPage title="Cronograma Maestro" /> },
                    { path: 'general', element: <PlaceholderPage title="Vista General del Proyecto" /> },
                    { path: 'ruta-critica', element: <PlaceholderPage title="Ruta Crítica" /> },
                    { path: 'fechas-importantes', element: <PlaceholderPage title="Fechas Importantes" /> },
                ],
            },
            // Documentación Routes
            {
                path: 'documentacion',
                children: [
                    { index: true, element: <PlaceholderPage title="Documentación" /> },
                    { path: 'planos', element: <PlaceholderPage title="Control de Planos" /> },
                    { path: 'especificaciones', element: <PlaceholderPage title="Especificaciones Técnicas" /> },
                    { path: 'entregables', element: <PlaceholderPage title="Entregables MEP" /> },
                    { path: 'generales', element: <PlaceholderPage title="Documentos Generales" /> },
                ],
            },
            // Mensajes Routes
            {
                path: 'mensajes',
                children: [
                    { index: true, element: <PlaceholderPage title="Mensajes Pendientes" /> },
                    { path: 'actas', element: <PlaceholderPage title="Actas de Reunión" /> },
                    { path: 'comunicaciones', element: <PlaceholderPage title="Comunicaciones Formales" /> },
                    { path: 'notificaciones', element: <PlaceholderPage title="Notificaciones" /> },
                    { path: 'chat', element: <PlaceholderPage title="Mensajería Directa" /> },
                ],
            },
        ],
    },
    {
        path: '/login',
        element: (
            <RootLayout>
                <Login />
            </RootLayout>
        ),
    },
]);