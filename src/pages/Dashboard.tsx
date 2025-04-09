
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, Bed, CalendarCheck, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const statsData = [
    { title: 'Total Patients', value: '3,721', icon: Users, color: 'bg-blue-500' },
    { title: 'Available Beds', value: '45/120', icon: Bed, color: 'bg-green-500' },
    { title: 'Appointments', value: '93', icon: CalendarCheck, color: 'bg-yellow-500' },
    { title: 'Revenue', value: '$12,480', icon: DollarSign, color: 'bg-purple-500' },
  ];

  const patientData = [
    { name: 'Jan', count: 400 },
    { name: 'Feb', count: 300 },
    { name: 'Mar', count: 520 },
    { name: 'Apr', count: 470 },
    { name: 'May', count: 450 },
    { name: 'Jun', count: 520 },
    { name: 'Jul', count: 580 },
  ];

  const departmentData = [
    { name: 'Cardiology', value: 35 },
    { name: 'Neurology', value: 25 },
    { name: 'Orthopedics', value: 20 },
    { name: 'Pediatrics', value: 15 },
    { name: 'Oncology', value: 10 },
  ];

  const patientGrowthData = [
    { name: 'Week 1', newPatients: 10, returning: 20 },
    { name: 'Week 2', newPatients: 15, returning: 25 },
    { name: 'Week 3', newPatients: 20, returning: 30 },
    { name: 'Week 4', newPatients: 25, returning: 40 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const recentPatients = [
    { id: 'P-1001', name: 'John Smith', status: 'Admitted', doctor: 'Dr. Sarah Johnson', date: '2025-04-09' },
    { id: 'P-1002', name: 'Emily Davis', status: 'Discharged', doctor: 'Dr. Michael Lee', date: '2025-04-08' },
    { id: 'P-1003', name: 'Robert Wilson', status: 'Outpatient', doctor: 'Dr. James Brown', date: '2025-04-07' },
    { id: 'P-1004', name: 'Jennifer Taylor', status: 'Emergency', doctor: 'Dr. Lisa Chen', date: '2025-04-06' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Hospital overview and statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Patient Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={patientData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#38bdf8" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="newPatients" name="New Patients" fill="#38bdf8" />
                <Bar dataKey="returning" name="Returning Patients" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left font-medium">ID</th>
                    <th className="py-2 text-left font-medium">Name</th>
                    <th className="py-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((patient) => (
                    <tr key={patient.id} className="border-b last:border-0">
                      <td className="py-2">{patient.id}</td>
                      <td className="py-2">{patient.name}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          patient.status === 'Admitted' ? 'bg-blue-100 text-blue-800' :
                          patient.status === 'Discharged' ? 'bg-green-100 text-green-800' :
                          patient.status === 'Emergency' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
