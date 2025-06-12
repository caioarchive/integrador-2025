
import React, { useState } from 'react';
import { Calendar, Clock, Filter, Download, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AttendanceChart from '@/components/AttendanceChart';

const mockAttendanceData = [
  {
    id: 1,
    internName: 'Ana Silva',
    date: '2024-06-10',
    checkIn: '08:00',
    checkOut: '17:00',
    status: 'present',
    hours: 8,
    department: 'Tecnologia'
  },
  {
    id: 2,
    internName: 'Carlos Santos',
    date: '2024-06-10',
    checkIn: '08:30',
    checkOut: '17:00',
    status: 'late',
    hours: 7.5,
    department: 'Marketing'
  },
  {
    id: 3,
    internName: 'Maria Oliveira',
    date: '2024-06-10',
    checkIn: '08:00',
    checkOut: '17:00',
    status: 'present',
    hours: 8,
    department: 'Recursos Humanos'
  },
  {
    id: 4,
    internName: 'João Pereira',
    date: '2024-06-10',
    checkIn: '-',
    checkOut: '-',
    status: 'absent',
    hours: 0,
    department: 'Financeiro'
  }
];

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState('2024-06-10');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-success text-white">Presente</Badge>;
      case 'absent':
        return <Badge variant="destructive">Ausente</Badge>;
      case 'late':
        return <Badge className="bg-warning text-white">Atrasado</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  const filteredData = mockAttendanceData.filter(record => {
    const matchesSearch = record.internName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const summary = {
    total: mockAttendanceData.length,
    present: mockAttendanceData.filter(r => r.status === 'present').length,
    late: mockAttendanceData.filter(r => r.status === 'late').length,
    absent: mockAttendanceData.filter(r => r.status === 'absent').length
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Controle de Frequência</h1>
            <p className="text-muted-foreground">Monitore a presença e pontualidade dos estagiários</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Registrar Ponto</span>
            </Button>
          </div>
        </div>

        {/* Resumo do dia */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{summary.total}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Presentes</p>
                  <p className="text-2xl font-bold text-success">{summary.present}</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <Clock className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Atrasados</p>
                  <p className="text-2xl font-bold text-warning">{summary.late}</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ausentes</p>
                  <p className="text-2xl font-bold text-destructive">{summary.absent}</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <Clock className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de frequência */}
          <div className="lg:col-span-2">
            <AttendanceChart />
          </div>

          {/* Controles */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Data</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">Todos</option>
                  <option value="present">Presente</option>
                  <option value="late">Atrasado</option>
                  <option value="absent">Ausente</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Buscar</label>
                <Input
                  placeholder="Nome do estagiário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de registros */}
        <Card>
          <CardHeader>
            <CardTitle>Registros de Frequência - {selectedDate}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Estagiário</th>
                    <th className="text-left p-4">Departamento</th>
                    <th className="text-left p-4">Entrada</th>
                    <th className="text-left p-4">Saída</th>
                    <th className="text-left p-4">Horas</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{record.internName}</td>
                      <td className="p-4 text-muted-foreground">{record.department}</td>
                      <td className="p-4">{record.checkIn}</td>
                      <td className="p-4">{record.checkOut}</td>
                      <td className="p-4">{record.hours}h</td>
                      <td className="p-4">{getStatusBadge(record.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Attendance;
