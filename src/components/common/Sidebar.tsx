// src/components/common/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    FileQuestion,
    Calendar,
    Target,
    Clock,
    FileText,
    MessageCircle,
    ChevronRight
} from 'lucide-react';

interface MenuItem {
    path: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    hasSubmenu?: boolean;
}

const menuItems: MenuItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/rfis', label: 'RFIs', icon: FileQuestion, hasSubmenu: true },
    { path: '/programacion-semanal', label: 'Programación Semanal', icon: Calendar, hasSubmenu: true },
    { path: '/alcance', label: 'Alcance', icon: Target, hasSubmenu: true },
    { path: '/cronogramas', label: 'Cronogramas', icon: Clock, hasSubmenu: true },
    { path: '/documentacion', label: 'Documentación', icon: FileText, hasSubmenu: true },
    { path: '/mensajes', label: 'Comunicaciones', icon: MessageCircle, hasSubmenu: true },
];

const Sidebar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <div className="w-64 bg-slate-800 text-white min-h-screen flex flex-col">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">
                    Plataforma Civil
                </h2>
                <p className="text-slate-400 text-sm mt-1">Gestión de Proyectos MEP</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`
                    flex items-center px-4 py-3 rounded-lg transition-all duration-200
                    ${active
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                                    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                                    {item.hasSubmenu && (
                                        <ChevronRight
                                            className={`w-4 h-4 transition-transform ${active ? 'rotate-90' : ''}`}
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
                <div className="text-xs text-slate-500 text-center">
                    © 2025 Plataforma Civil v1.0
                </div>
            </div>
        </div>
    );
};

export default Sidebar;