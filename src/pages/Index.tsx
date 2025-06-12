import React from 'react';
import { Users, Calendar, FileText, TrendingUp } from 'lucide-react';
import Layout from '@/components/Layout';
import MetricCard from '@/components/MetricCard';
import InternCard from '@/components/InternCard';
import AttendanceChart from '@/components/AttendanceChart';
import RecentActivity from '@/components/RecentActivity';

// Mock data for demonstration
const mockInterns = [
  {
    name: 'Ana Silva',
    position: 'Estagiária de TI',
    department: 'Tecnologia',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=150&h=150&fit=crop&crop=face',
    status: 'active' as const,
    rating: 4.8,
    attendance: 95,
    startDate: '15/01/2024'
  },
  {
    name: 'Carlos Santos',
    position: 'Estagiário de Marketing',
    department: 'Marketing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'late' as const,
    rating: 4.2,
    attendance: 87,
    startDate: '22/02/2024'
  },
  {
    name: 'Maria Oliveira',
    position: 'Estagiária de RH',
    department: 'Recursos Humanos',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'active' as const,
    rating: 4.9,
    attendance: 98,
    startDate: '03/03/2024'
  },
  {
    name: 'João Pereira',
    position: 'Estagiário Financeiro',
    department: 'Financeiro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'absent' as const,
    rating: 4.1,
    attendance: 92,
    startDate: '10/01/2024'
  }
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Dashboard de Gestão de Estágios
          </h2>
          <p className="text-muted-foreground">
            Acompanhe o desempenho e frequência dos seus estagiários em tempo real
          </p>
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total de Estagiários"
            value="24"
            change="+3 este mês"
            changeType="positive"
            icon={Users}
            color="blue"
          />
          <MetricCard
            title="Frequência Média"
            value="92%"
            change="+2% vs mês anterior"
            changeType="positive"
            icon={Calendar}
            color="green"
          />
          <MetricCard
            title="Avaliações Pendentes"
            value="7"
            change="3 vencendo hoje"
            changeType="negative"
            icon={FileText}
            color="yellow"
          />
          <MetricCard
            title="Performance Geral"
            value="4.6/5"
            change="+0.2 vs trimestre anterior"
            changeType="positive"
            icon={TrendingUp}
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de frequência */}
          <div className="lg:col-span-2">
            <AttendanceChart />
          </div>
          
          {/* Atividades recentes */}
          <div>
            <RecentActivity />
          </div>
        </div>

        {/* Lista de estagiários */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Estagiários Ativos</h3>
            <button className="text-primary hover:text-primary/80 font-medium">
              Ver todos
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockInterns.map((intern, index) => (
              <InternCard key={index} {...intern} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
