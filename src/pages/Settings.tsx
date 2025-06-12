
import React, { useState } from 'react';
import { Save, User, Bell, Shield, Database, Mail, Palette } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Configurações da empresa
    companyName: '2RP NET SERVICOS LTDA',
    companyEmail: 'contato@2rp.net',
    companyPhone: '(11) 3333-4444',
    companyAddress: 'São Paulo, SP',
    
    // Configurações de notificações
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    evaluationReminders: true,
    attendanceAlerts: true,
    
    // Configurações do sistema
    autoBackup: true,
    dataRetention: '24', // meses
    sessionTimeout: '120', // minutos
    
    // Configurações de avaliação
    evaluationFrequency: 'monthly',
    autoEvaluationReminder: true,
    evaluationTemplate: 'standard',
    
    // Configurações de frequência
    workHours: '8',
    toleranceMinutes: '15',
    trackLocation: false,
    
    // Email templates
    welcomeEmailTemplate: 'Bem-vindo ao programa de estágios...',
    evaluationEmailTemplate: 'É hora da sua avaliação mensal...',
  });

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Aqui você salvaria as configurações
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
            <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
          </div>
          <Button onClick={handleSave} className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Salvar Alterações</span>
          </Button>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="company" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Empresa</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Sistema</span>
            </TabsTrigger>
            <TabsTrigger value="evaluations" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Avaliações</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Frequência</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Templates</span>
            </TabsTrigger>
          </TabsList>

          {/* Configurações da Empresa */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => updateSetting('companyName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyEmail">Email Principal</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => updateSetting('companyEmail', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyPhone">Telefone</Label>
                    <Input
                      id="companyPhone"
                      value={settings.companyPhone}
                      onChange={(e) => updateSetting('companyPhone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyAddress">Endereço</Label>
                    <Input
                      id="companyAddress"
                      value={settings.companyAddress}
                      onChange={(e) => updateSetting('companyAddress', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Notificações */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações por Email</h4>
                    <p className="text-sm text-muted-foreground">Receber notificações via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações Push</h4>
                    <p className="text-sm text-muted-foreground">Receber notificações no navegador</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Relatórios Semanais</h4>
                    <p className="text-sm text-muted-foreground">Receber relatórios automáticos</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Lembretes de Avaliação</h4>
                    <p className="text-sm text-muted-foreground">Alertas sobre avaliações pendentes</p>
                  </div>
                  <Switch
                    checked={settings.evaluationReminders}
                    onCheckedChange={(checked) => updateSetting('evaluationReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Alertas de Frequência</h4>
                    <p className="text-sm text-muted-foreground">Notificar sobre ausências</p>
                  </div>
                  <Switch
                    checked={settings.attendanceAlerts}
                    onCheckedChange={(checked) => updateSetting('attendanceAlerts', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações do Sistema */}
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Backup Automático</h4>
                    <p className="text-sm text-muted-foreground">Realizar backup dos dados automaticamente</p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dataRetention">Retenção de Dados (meses)</Label>
                    <Input
                      id="dataRetention"
                      type="number"
                      value={settings.dataRetention}
                      onChange={(e) => updateSetting('dataRetention', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Avaliações */}
          <TabsContent value="evaluations">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Avaliação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="evaluationFrequency">Frequência das Avaliações</Label>
                  <select
                    id="evaluationFrequency"
                    value={settings.evaluationFrequency}
                    onChange={(e) => updateSetting('evaluationFrequency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="weekly">Semanal</option>
                    <option value="biweekly">Quinzenal</option>
                    <option value="monthly">Mensal</option>
                    <option value="quarterly">Trimestral</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="evaluationTemplate">Template de Avaliação</Label>
                  <select
                    id="evaluationTemplate"
                    value={settings.evaluationTemplate}
                    onChange={(e) => updateSetting('evaluationTemplate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="standard">Padrão</option>
                    <option value="technical">Técnico</option>
                    <option value="behavioral">Comportamental</option>
                    <option value="custom">Personalizado</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Lembretes Automáticos</h4>
                    <p className="text-sm text-muted-foreground">Enviar lembretes de avaliação automaticamente</p>
                  </div>
                  <Switch
                    checked={settings.autoEvaluationReminder}
                    onCheckedChange={(checked) => updateSetting('autoEvaluationReminder', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Frequência */}
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Frequência</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workHours">Horas de Trabalho Diárias</Label>
                    <Input
                      id="workHours"
                      type="number"
                      value={settings.workHours}
                      onChange={(e) => updateSetting('workHours', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="toleranceMinutes">Tolerância para Atraso (minutos)</Label>
                    <Input
                      id="toleranceMinutes"
                      type="number"
                      value={settings.toleranceMinutes}
                      onChange={(e) => updateSetting('toleranceMinutes', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Rastreamento de Localização</h4>
                    <p className="text-sm text-muted-foreground">Verificar localização no registro de ponto</p>
                  </div>
                  <Switch
                    checked={settings.trackLocation}
                    onCheckedChange={(checked) => updateSetting('trackLocation', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates de Email */}
          <TabsContent value="templates">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Template de Boas-vindas</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={settings.welcomeEmailTemplate}
                    onChange={(e) => updateSetting('welcomeEmailTemplate', e.target.value)}
                    rows={4}
                    placeholder="Template do email de boas-vindas..."
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Template de Avaliação</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={settings.evaluationEmailTemplate}
                    onChange={(e) => updateSetting('evaluationEmailTemplate', e.target.value)}
                    rows={4}
                    placeholder="Template do email de avaliação..."
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
