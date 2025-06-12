
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InternForm from '@/components/InternForm';
import InternDetails from '@/components/InternDetails';

// Mock data expandido
const mockInterns = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '(11) 99999-9999',
    position: 'Estagiária de TI',
    department: 'Tecnologia',
    supervisor: 'Carlos Oliveira',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=150&h=150&fit=crop&crop=face',
    status: 'active' as const,
    rating: 4.8,
    attendance: 95,
    startDate: '15/01/2024',
    endDate: '15/07/2024',
    university: 'USP',
    course: 'Ciência da Computação',
    semester: '6º semestre'
  },
  {
    id: 2,
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    phone: '(11) 88888-8888',
    position: 'Estagiário de Marketing',
    department: 'Marketing',
    supervisor: 'Maria Fernanda',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'late' as const,
    rating: 4.2,
    attendance: 87,
    startDate: '22/02/2024',
    endDate: '22/08/2024',
    university: 'PUC-SP',
    course: 'Publicidade e Propaganda',
    semester: '5º semestre'
  },
  {
    id: 3,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    phone: '(11) 77777-7777',
    position: 'Estagiária de RH',
    department: 'Recursos Humanos',
    supervisor: 'João Silva',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'active' as const,
    rating: 4.9,
    attendance: 98,
    startDate: '03/03/2024',
    endDate: '03/09/2024',
    university: 'UNESP',
    course: 'Psicologia',
    semester: '7º semestre'
  }
];

const Interns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-white">Ativo</Badge>;
      case 'absent':
        return <Badge variant="destructive">Ausente</Badge>;
      case 'late':
        return <Badge className="bg-warning text-white">Atrasado</Badge>;
      default:
        return <Badge variant="secondary">Inativo</Badge>;
    }
  };

  const filteredInterns = mockInterns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || intern.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestão de Estagiários</h1>
            <p className="text-muted-foreground">Gerencie todos os estagiários da empresa</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Novo Estagiário</span>
          </Button>
        </div>

        {/* Filtros e busca */}
        <Card>
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou departamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">Todos os Status</option>
                <option value="active">Ativo</option>
                <option value="late">Atrasado</option>
                <option value="absent">Ausente</option>
              </select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de estagiários */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterns.map((intern) => (
            <Card key={intern.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={intern.avatar}
                    alt={intern.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{intern.name}</h3>
                    <p className="text-sm text-muted-foreground">{intern.position}</p>
                    <p className="text-xs text-muted-foreground">{intern.department}</p>
                  </div>
                  {getStatusBadge(intern.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Frequência:</span>
                    <span className="font-medium">{intern.attendance}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avaliação:</span>
                    <span className="font-medium">{intern.rating}/5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Supervisor:</span>
                    <span className="font-medium">{intern.supervisor}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedIntern(intern);
                      setShowDetails(true);
                    }}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedIntern(intern);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modais */}
        {showForm && (
          <InternForm
            intern={selectedIntern}
            onClose={() => {
              setShowForm(false);
              setSelectedIntern(null);
            }}
          />
        )}

        {showDetails && selectedIntern && (
          <InternDetails
            intern={selectedIntern}
            onClose={() => {
              setShowDetails(false);
              setSelectedIntern(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default Interns;
