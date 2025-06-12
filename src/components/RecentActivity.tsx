
import React from 'react';
import { Clock, User, FileText, Calendar } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'evaluation',
    user: 'Ana Silva',
    action: 'completou avaliação mensal',
    time: '2 horas atrás',
    icon: FileText,
  },
  {
    id: 2,
    type: 'attendance',
    user: 'Carlos Santos',
    action: 'registrou presença',
    time: '3 horas atrás',
    icon: Clock,
  },
  {
    id: 3,
    type: 'meeting',
    user: 'Maria Oliveira',
    action: 'agendou reunião de feedback',
    time: '5 horas atrás',
    icon: Calendar,
  },
  {
    id: 4,
    type: 'profile',
    user: 'João Pereira',
    action: 'atualizou perfil',
    time: '1 dia atrás',
    icon: User,
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-primary/10 rounded-lg">
              <activity.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{' '}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
