
import React from 'react';
import { Calendar, Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface InternCardProps {
  name: string;
  position: string;
  department: string;
  avatar: string;
  status: 'active' | 'absent' | 'late';
  rating: number;
  attendance: number;
  startDate: string;
}

const InternCard: React.FC<InternCardProps> = ({
  name,
  position,
  department,
  avatar,
  status,
  rating,
  attendance,
  startDate
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-white">Presente</Badge>;
      case 'absent':
        return <Badge variant="destructive">Ausente</Badge>;
      case 'late':
        return <Badge className="bg-warning text-white">Atrasado</Badge>;
      default:
        return <Badge variant="secondary">Inativo</Badge>;
    }
  };

  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{position}</p>
            <p className="text-xs text-muted-foreground">{department}</p>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-warning fill-current" />
              <span className="text-sm font-medium">Avaliação</span>
            </div>
            <span className="text-sm font-semibold">{rating}/5</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-info" />
              <span className="text-sm font-medium">Frequência</span>
            </div>
            <span className="text-sm font-semibold">{attendance}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Início</span>
            </div>
            <span className="text-sm">{startDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InternCard;
