
import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EvaluationFormProps {
  evaluation?: any;
  onClose: () => void;
}

const categories = [
  { key: 'technical', label: 'Conhecimento Técnico' },
  { key: 'communication', label: 'Comunicação' },
  { key: 'teamwork', label: 'Trabalho em Equipe' },
  { key: 'initiative', label: 'Iniciativa' },
  { key: 'punctuality', label: 'Pontualidade' },
  { key: 'responsibility', label: 'Responsabilidade' }
];

const EvaluationForm: React.FC<EvaluationFormProps> = ({ evaluation, onClose }) => {
  const [formData, setFormData] = useState({
    internName: evaluation?.internName || '',
    evaluator: evaluation?.evaluator || '',
    period: evaluation?.period || '',
    date: evaluation?.date || new Date().toISOString().split('T')[0],
    ratings: evaluation?.categories || {},
    comments: evaluation?.comments || '',
    goals: '',
    recommendations: ''
  });

  const handleRatingChange = (category: string, rating: number) => {
    setFormData(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [category]: rating }
    }));
  };

  const renderStarRating = (category: string, currentRating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(category, star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= currentRating
                  ? 'text-warning fill-current'
                  : 'text-gray-300 hover:text-warning'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Evaluation submitted:', formData);
    onClose();
  };

  const ratingValues = Object.values(formData.ratings).filter((rating): rating is number => 
    typeof rating === 'number' && rating > 0
  );
  const overallRating = ratingValues.length > 0
    ? ratingValues.reduce((acc: number, rating: number) => acc + rating, 0) / ratingValues.length
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {evaluation ? 'Editar Avaliação' : 'Nova Avaliação'}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="internName">Estagiário</Label>
                <Input
                  id="internName"
                  value={formData.internName}
                  onChange={(e) => setFormData(prev => ({ ...prev, internName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="evaluator">Avaliador</Label>
                <Input
                  id="evaluator"
                  value={formData.evaluator}
                  onChange={(e) => setFormData(prev => ({ ...prev, evaluator: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="period">Período</Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                  placeholder="Ex: Mai/2024"
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Data da Avaliação</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Avaliações por categoria */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Avaliação por Categoria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categories.map((category) => (
                  <div key={category.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{category.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        Avalie de 1 a 5 estrelas
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {renderStarRating(category.key, formData.ratings[category.key] || 0)}
                      <span className="text-sm font-medium w-8">
                        {formData.ratings[category.key] || 0}/5
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Nota geral */}
            {overallRating > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Nota Geral</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= overallRating ? 'text-warning fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-bold">{overallRating.toFixed(1)}/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="comments">Comentários Gerais</Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                  rows={4}
                  placeholder="Descreva o desempenho geral do estagiário..."
                />
              </div>
              <div>
                <Label htmlFor="goals">Metas para o Próximo Período</Label>
                <Textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  rows={3}
                  placeholder="Liste as metas e objetivos para o próximo período..."
                />
              </div>
              <div>
                <Label htmlFor="recommendations">Recomendações</Label>
                <Textarea
                  id="recommendations"
                  value={formData.recommendations}
                  onChange={(e) => setFormData(prev => ({ ...prev, recommendations: e.target.value }))}
                  rows={3}
                  placeholder="Sugestões de melhorias ou pontos de atenção..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                {evaluation ? 'Atualizar Avaliação' : 'Salvar Avaliação'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationForm;
