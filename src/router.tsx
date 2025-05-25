// src/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';

// RFIs
import RFIsMenu from './pages/rfis/RFIsMenu';
import CreateRFI from './pages/rfis/CreateRFI';
import RFIInbox from './pages/rfis/RFIInbox';
import RFIHistory from './pages/rfis/RFIHistory';

// Schedule (Programación Semanal)
import ScheduleMenu from './pages/schedules/ScheduleMenu';

// Scope (Alcance)
import ScopeMenu from './pages/scope/ScopeMenu';

// Schedules (Cronogramas)
import SchedulesMenu from './pages/schedules/SchedulesMenu';

// Páginas placeholder temporales
const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">Página en construcción...</p>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-900 font-medium mb-2">Próximamente disponible</h3>
            <p className="text-blue-800 text-sm">
                Esta funcionalidad está siendo desarrollada y estará disponible en futuras versiones de la plataforma.
            </p>
        </div>
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
            
            // ==================== RFIs Routes ====================
            {
                path: 'rfis',
                children: [
                    { index: true, element: <RFIsMenu /> },
                    { path: 'crear', element: <CreateRFI /> },
                    { path: 'bandeja', element: <RFIInbox /> },
                    { path: 'historial', element: <RFIHistory /> },
                ],
            },
            
            // ==================== Programación Semanal Routes ====================
            {
                path: 'programacion-semanal',
                children: [
                    { index: true, element: <ScheduleMenu /> },
                    { 
                        path: 'actividades', 
                        element: <PlaceholderPage title="Creación y Gestión de Actividades Semanales" /> 
                    },
                    { 
                        path: 'seguimiento', 
                        element: <PlaceholderPage title="Seguimiento del Avance Diario/Semanal" /> 
                    },
                    { 
                        path: 'dependencias', 
                        element: <PlaceholderPage title="Dependencias y Coordinación" /> 
                    },
                    { 
                        path: 'reportes-subcontratistas', 
                        element: <PlaceholderPage title="Reporte de Subcontratistas" /> 
                    },
                ],
            },
            
            // ==================== Alcance Routes ====================
            {
                path: 'alcance',
                children: [
                    { index: true, element: <ScopeMenu /> },
                    { 
                        path: 'repositorio', 
                        element: <PlaceholderPage title="Repositorio de Documentos de Alcance" /> 
                    },
                    { 
                        path: 'licitaciones', 
                        element: <PlaceholderPage title="Gestión de Paquetes de Licitación MEP" /> 
                    },
                    { 
                        path: 'clarificaciones', 
                        element: <PlaceholderPage title="Clarificación del Alcance" /> 
                    },
                    { 
                        path: 'qa', 
                        element: <PlaceholderPage title="Módulo de Preguntas y Respuestas (Q&A)" /> 
                    },
                ],
            },
            
            // ==================== Cronogramas Routes ====================
            {
                path: 'cronogramas',
                children: [
                    { index: true, element: <SchedulesMenu /> },
                    { 
                        path: 'maestro', 
                        element: <PlaceholderPage title="Carga e Integración del Cronograma Maestro" /> 
                    },
                    { 
                        path: 'general', 
                        element: <PlaceholderPage title="Visualización General del Proyecto" /> 
                    },
                    { 
                        path: 'ruta-critica', 
                        element: <PlaceholderPage title="Identificación y Monitoreo de la Ruta Crítica" /> 
                    },
                    { 
                        path: 'fechas-importantes', 
                        element: <PlaceholderPage title="Seguimiento de Fechas Importantes" /> 
                    },
                ],
            },
            
            // ==================== Documentación Routes ====================
            {
                path: 'documentacion',
                children: [
                    { 
                        index: true, 
                        element: <PlaceholderPage title="Documentación" /> 
                    },
                    { 
                        path: 'planos', 
                        element: <PlaceholderPage title="Control de Planos" /> 
                    },
                    { 
                        path: 'especificaciones', 
                        element: <PlaceholderPage title="Gestión de Especificaciones Técnicas" /> 
                    },
                    { 
                        path: 'entregables', 
                        element: <PlaceholderPage title="Gestión de Submittals (Entregables MEP)" /> 
                    },
                    { 
                        path: 'generales', 
                        element: <PlaceholderPage title="Documentos Generales del Proyecto" /> 
                    },
                ],
            },
            
            // ==================== Mensajes Routes ====================
            {
                path: 'mensajes',
                children: [
                    { 
                        index: true, 
                        element: <PlaceholderPage title="Mensajes Pendientes" /> 
                    },
                    { 
                        path: 'actas', 
                        element: <PlaceholderPage title="Actas de Reunión (Meeting Minutes)" /> 
                    },
                    { 
                        path: 'comunicaciones', 
                        element: <PlaceholderPage title="Registro de Comunicaciones Formales" /> 
                    },
                    { 
                        path: 'notificaciones', 
                        element: <PlaceholderPage title="Sistema de Notificaciones" /> 
                    },
                    { 
                        path: 'chat', 
                        element: <PlaceholderPage title="Mensajería Directa y Hilos de Conversación" /> 
                    },
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
    {
        path: '*',
        element: (
            <RootLayout>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="max-w-md w-full text-center">
                        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Página no encontrada</h2>
                        <p className="text-gray-600 mb-6">
                            Lo sentimos, la página que buscas no existe o ha sido movida.
                        </p>
                        <div className="space-y-3">
                            <a
                                href="/dashboard"
                                className="block w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Ir al Dashboard
                            </a>
                            <a
                                href="/rfis"
                                className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Gestión RFIs
                            </a>
                        </div>
                    </div>
                </div>
            </RootLayout>
        ),
    },
]);