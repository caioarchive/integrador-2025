
import React from 'react';
import { Home, Users, Calendar, FileText, BarChart, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigationItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Estagiários', path: '/estagiarios' },
  { icon: Calendar, label: 'Frequência', path: '/frequencia' },
  { icon: FileText, label: 'Avaliações', path: '/avaliacoes' },
  { icon: BarChart, label: 'Relatórios', path: '/relatorios' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                  location.pathname === item.path
                    ? "bg-primary text-white shadow-md" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
