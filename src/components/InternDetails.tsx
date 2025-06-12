
import React from 'react';
import { X, Mail, Phone, Calendar, Star, Clock, User, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InternDetailsProps {
  intern: any;
  onClose: () => void;
}

const InternDetails: React.FC<InternDetailsProps> = ({ intern, onClose }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Detalhes do Estagiário</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Informações principais */}
          <div className="flex items-center space-x-6">
            <img
              src={intern.avatar}
              alt={intern.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{intern.name}</h2>
              <p className="text-lg text-muted-foreground">{intern.position}</p>
              <p className="text-muted-foreground">{intern.department}</p>
              <div className="mt-2">{getStatusBadge(intern.status)}</div>
            </div>
          </div>

          {/* Informações de contato */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{intern.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{intern.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações acadêmicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Acadêmicas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Universidade</p>
                  <p className="font-medium">{intern.university}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Curso</p>
                <p className="font-medium">{intern.course}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Semestre</p>
                <p className="font-medium">{intern.semester}</p>
              </div>
            </CardContent>
          </Card>

          {/* Informações do estágio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações do Estágio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Supervisor</p>
                    <p className="font-medium">{intern.supervisor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Período</p>
                    <p className="font-medium">{intern.startDate} - {intern.endDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métricas de desempenho */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <Clock className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequência</p>
                    <p className="text-2xl font-bold">{intern.attendance}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <Star className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avaliação</p>
                    <p className="text-2xl font-bold">{intern.rating}/5</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button>
              Editar Estagiário
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternDetails;
