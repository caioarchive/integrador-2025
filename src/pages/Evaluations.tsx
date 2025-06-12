
import React, { useState } from 'react';
import { Plus, Star, Eye, Edit, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EvaluationForm from '@/components/EvaluationForm';

const mockEvaluations = [
  {
    id: 1,
    internName: 'Ana Silva',
    evaluator: 'Carlos Oliveira',
    period: 'Mai/2024',
    date: '2024-05-30',
    status: 'completed',
    overallRating: 4.8,
    categories: {
      technical: 4.5,
      communication: 5.0,
      teamwork: 4.8,
      initiative: 4.6,
      punctuality: 5.0
    },
    comments: 'Excelente desempenho, muito dedicada e proativa.',
    department: 'Tecnologia'
  },
  {
    id: 2,
    internName: 'Carlos Santos',
    evaluator: 'Maria Fernanda',
    period: 'Mai/2024',
    date: '2024-05-28',
    status: 'completed',
    overallRating: 4.2,
    categories: {
      technical: 4.0,
      communication: 4.5,
      teamwork: 4.2,
      initiative: 4.0,
      punctuality: 4.2
    },
    comments: 'Bom desempenho geral, pode melhorar na pontualidade.',
    department: 'Marketing'
  },
  {
    id: 3,
    internName: 'Maria Oliveira',
    evaluator: 'João Silva',
    period: 'Jun/2024',
    date: '2024-06-10',
    status: 'pending',
    overallRating: 0,
    categories: {},
    comments: '',
    department: 'Recursos Humanos'
  }
];

const Evaluations = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success text-white">Concluída</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-white">Pendente</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Atrasada</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-warning fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredEvaluations = mockEvaluations.filter(evaluation => {
    return statusFilter === 'all' || evaluation.status === statusFilter;
  });

  const summary = {
    total: mockEvaluations.length,
    completed: mockEvaluations.filter(e => e.status === 'completed').length,
    pending: mockEvaluations.filter(e => e.status === 'pending').length,
    averageRating: mockEvaluations
      .filter(e => e.status === 'completed')
      .reduce((acc, e) => acc + e.overallRating, 0) / 
      mockEvaluations.filter(e => e.status === 'completed').length || 0
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Avaliações</h1>
            <p className="text-muted-foreground">Gerencie as avaliações de desempenho dos estagiários</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Nova Avaliação</span>
          </Button>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{summary.total}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Star className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                  <p className="text-2xl font-bold text-success">{summary.completed}</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <Star className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold text-warning">{summary.pending}</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Star className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Média Geral</p>
                  <p className="text-2xl font-bold">{summary.averageRating.toFixed(1)}/5</p>
                </div>
                <div className="p-3 bg-info/10 rounded-lg">
                  <Star className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">Todas as Avaliações</option>
                <option value="completed">Concluídas</option>
                <option value="pending">Pendentes</option>
                <option value="overdue">Atrasadas</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de avaliações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvaluations.map((evaluation) => (
            <Card key={evaluation.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{evaluation.internName}</h3>
                    <p className="text-muted-foreground">{evaluation.department}</p>
                    <p className="text-sm text-muted-foreground">
                      Avaliador: {evaluation.evaluator}
                    </p>
                  </div>
                  {getStatusBadge(evaluation.status)}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Período:</span>
                    <span className="font-medium">{evaluation.period}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data:</span>
                    <span className="font-medium">{evaluation.date}</span>
                  </div>
                  {evaluation.status === 'completed' && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Nota Geral:</span>
                      <div className="flex items-center space-x-2">
                        {renderStars(evaluation.overallRating)}
                        <span className="font-medium">{evaluation.overallRating}/5</span>
                      </div>
                    </div>
                  )}
                </div>

                {evaluation.status === 'completed' && evaluation.categories && (
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium">Categorias:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Técnico:</span>
                        <span>{evaluation.categories.technical}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comunicação:</span>
                        <span>{evaluation.categories.communication}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trabalho em equipe:</span>
                        <span>{evaluation.categories.teamwork}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Iniciativa:</span>
                        <span>{evaluation.categories.initiative}/5</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver Detalhes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedEvaluation(evaluation);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal de formulário */}
        {showForm && (
          <EvaluationForm
            evaluation={selectedEvaluation}
            onClose={() => {
              setShowForm(false);
              setSelectedEvaluation(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default Evaluations;
