
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar, Filter, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Reports: React.FC = () => {
  const [reportPeriod, setReportPeriod] = useState('month');
  
  const departmentPerformance = [
    { name: 'Cardiology', patients: 180, revenue: 75000 },
    { name: 'Neurology', patients: 120, revenue: 62000 },
    { name: 'Orthopedics', patients: 150, revenue: 83000 },
    { name: 'Pediatrics', patients: 200, revenue: 45000 },
    { name: 'Oncology', patients: 90, revenue: 105000 },
  ];

  const patientTrend = [
    { name: 'Jan', inpatients: 125, outpatients: 350 },
    { name: 'Feb', inpatients: 110, outpatients: 320 },
    { name: 'Mar', inpatients: 145, outpatients: 380 },
    { name: 'Apr', inpatients: 130, outpatients: 410 },
    { name: 'May', inpatients: 155, outpatients: 430 },
    { name: 'Jun', inpatients: 170, outpatients: 450 },
    { name: 'Jul', inpatients: 180, outpatients: 480 },
  ];

  const diagnosisDistribution = [
    { name: 'Cardiovascular', value: 25 },
    { name: 'Respiratory', value: 18 },
    { name: 'Gastrointestinal', value: 15 },
    { name: 'Neurological', value: 12 },
    { name: 'Orthopedic', value: 10 },
    { name: 'Other', value: 20 },
  ];

  const occupancyRate = [
    { name: 'Week 1', rate: 72 },
    { name: 'Week 2', rate: 68 },
    { name: 'Week 3', rate: 75 },
    { name: 'Week 4', rate: 82 },
  ];

  const revenueByType = [
    { name: 'Consultation', value: 30 },
    { name: 'Laboratory', value: 25 },
    { name: 'Surgery', value: 20 },
    { name: 'Pharmacy', value: 15 },
    { name: 'Imaging', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const recentReports = [
    { id: 'REP-1001', name: 'Monthly Financial Summary', type: 'Finance', date: '2025-03-31', createdBy: 'Admin' },
    { id: 'REP-1002', name: 'Quarterly Patient Statistics', type: 'Operations', date: '2025-03-31', createdBy: 'Admin' },
    { id: 'REP-1003', name: 'Staff Performance Review', type: 'HR', date: '2025-04-05', createdBy: 'HR Manager' },
    { id: 'REP-1004', name: 'Inventory Usage Report', type: 'Inventory', date: '2025-04-07', createdBy: 'Inventory Manager' },
    { id: 'REP-1005', name: 'Department Efficiency Analysis', type: 'Operations', date: '2025-04-08', createdBy: 'Operations Manager' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">View and generate hospital performance reports</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <h3 className="text-2xl font-bold">1,845</h3>
              </div>
              <div className="text-sm text-green-600 flex items-center">
                +12.5% <span className="ml-1">↑</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Average Stay</p>
                <h3 className="text-2xl font-bold">3.2 days</h3>
              </div>
              <div className="text-sm text-red-600 flex items-center">
                -0.5 days <span className="ml-1">↓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Bed Occupancy</p>
                <h3 className="text-2xl font-bold">76%</h3>
              </div>
              <div className="text-sm text-green-600 flex items-center">
                +5% <span className="ml-1">↑</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center">
            <LineChartIcon className="h-4 w-4 mr-2" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="clinical" className="flex items-center">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Clinical
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="patients" fill="#38bdf8" name="Patients" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#0ea5e9" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={patientTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="inpatients" stroke="#0ea5e9" activeDot={{ r: 8 }} name="Inpatients" />
                    <Line type="monotone" dataKey="outpatients" stroke="#38bdf8" name="Outpatients" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Diagnosis Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={diagnosisDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {diagnosisDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Bed Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={occupancyRate}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Occupancy Rate']} />
                    <Line type="monotone" dataKey="rate" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Service Type</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueByType}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border border-dashed border-gray-200">
                <div className="text-center">
                  <p className="text-muted-foreground">Clinical reports data</p>
                  <p className="text-sm text-muted-foreground">Configure settings to view clinical metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Reports</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="inventory">Inventory</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.createdBy}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
