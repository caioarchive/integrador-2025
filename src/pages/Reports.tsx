
import React, { useState } from 'react';
import { Download, Filter, BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Pie } from 'recharts';

const attendanceData = [
  { month: 'Jan', attendance: 92, total: 100 },
  { month: 'Fev', attendance: 88, total: 100 },
  { month: 'Mar', attendance: 95, total: 100 },
  { month: 'Abr', attendance: 91, total: 100 },
  { month: 'Mai', attendance: 94, total: 100 },
  { month: 'Jun', attendance: 89, total: 100 },
];

const performanceData = [
  { department: 'Tecnologia', average: 4.8, interns: 8 },
  { department: 'Marketing', average: 4.2, interns: 5 },
  { department: 'RH', average: 4.6, interns: 3 },
  { department: 'Financeiro', average: 4.4, interns: 4 },
  { department: 'Vendas', average: 4.1, interns: 6 },
];

const statusData = [
  { name: 'Ativos', value: 22, color: '#10B981' },
  { name: 'Em Avaliação', value: 3, color: '#F59E0B' },
  { name: 'Concluídos', value: 8, color: '#6366F1' },
  { name: 'Cancelados', value: 2, color: '#EF4444' },
];

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedReport, setSelectedReport] = useState('attendance');

  const reportTypes = [
    { key: 'attendance', label: 'Frequência', icon: Calendar },
    { key: 'performance', label: 'Desempenho', icon: TrendingUp },
    { key: 'status', label: 'Status dos Estágios', icon: PieChart },
    { key: 'departments', label: 'Por Departamento', icon: BarChart3 },
  ];

  const generateReport = () => {
    console.log(`Generating ${selectedReport} report for ${selectedPeriod}`);
  };

  const exportReport = () => {
    console.log(`Exporting ${selectedReport} report for ${selectedPeriod}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
            <p className="text-muted-foreground">Análises e métricas detalhadas dos estágios</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={exportReport} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </Button>
            <Button onClick={generateReport} className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Gerar Relatório</span>
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Período</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="last6months">Últimos 6 meses</option>
                  <option value="last3months">Últimos 3 meses</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tipo de Relatório</label>
                <select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  {reportTypes.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo executivo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Estagiários</p>
                  <p className="text-2xl font-bold">35</p>
                  <p className="text-xs text-success">+12% vs período anterior</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Frequência Média</p>
                  <p className="text-2xl font-bold">91.5%</p>
                  <p className="text-xs text-success">+3.2% vs período anterior</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nota Média</p>
                  <p className="text-2xl font-bold">4.4/5</p>
                  <p className="text-xs text-success">+0.3 vs período anterior</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Retenção</p>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-success">+5% vs período anterior</p>
                </div>
                <div className="p-3 bg-info/10 rounded-lg">
                  <PieChart className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Frequência por Mês */}
          <Card>
            <CardHeader>
              <CardTitle>Frequência Mensal (%)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Desempenho por Departamento */}
          <Card>
            <CardHeader>
              <CardTitle>Avaliação Média por Departamento</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" domain={[0, 5]} stroke="#666" />
                  <YAxis dataKey="department" type="category" stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar 
                    dataKey="average" 
                    fill="hsl(var(--warning))" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status dos Estágios */}
          <Card>
            <CardHeader>
              <CardTitle>Status dos Estágios</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    dataKey="value"
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Métricas detalhadas */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas Detalhadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="font-medium">Taxa de Conclusão</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    <span className="text-sm font-medium">89%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="font-medium">Satisfação dos Mentores</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="font-medium">Tempo Médio de Estágio</span>
                  <span className="text-sm font-medium">5.2 meses</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="font-medium">Estagiários Efetivados</span>
                  <span className="text-sm font-medium">23%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights e recomendações */}
        <Card>
          <CardHeader>
            <CardTitle>Insights e Recomendações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-success mb-2">Pontos Positivos</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Frequência geral acima da meta (90%)</li>
                  <li>• Departamento de Tecnologia com excelente desempenho</li>
                  <li>• Alta satisfação dos mentores</li>
                  <li>• Crescimento no número de estagiários</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-warning mb-2">Pontos de Atenção</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Departamento de Vendas precisa de suporte</li>
                  <li>• 3 avaliações pendentes este mês</li>
                  <li>• Frequência baixa em junho</li>
                  <li>• Taxa de efetivação pode melhorar</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
