import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AddDoctorDialog from '@/components/doctors/AddDoctorDialog';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  phone: string;
  email: string;
  status: string;
  patients: number;
  image?: string;
}

const Doctors: React.FC = () => {
  const [showAddDoctorDialog, setShowAddDoctorDialog] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 'DR-1001', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', department: 'Cardiac Care', phone: '(555) 123-7890', email: 'sarah.johnson@hospital.com', status: 'Active', patients: 34, image: 'https://randomuser.me/api/portraits/women/32.jpg' },
    { id: 'DR-1002', name: 'Dr. Michael Lee', specialty: 'Neurology', department: 'Neuroscience', phone: '(555) 234-8901', email: 'michael.lee@hospital.com', status: 'Active', patients: 27, image: 'https://randomuser.me/api/portraits/men/18.jpg' },
    { id: 'DR-1003', name: 'Dr. Emma Wilson', specialty: 'Pediatrics', department: 'Children\'s Health', phone: '(555) 345-9012', email: 'emma.wilson@hospital.com', status: 'On Leave', patients: 21, image: 'https://randomuser.me/api/portraits/women/45.jpg' },
    { id: 'DR-1004', name: 'Dr. Robert Brown', specialty: 'Orthopedics', department: 'Orthopedic Surgery', phone: '(555) 456-0123', email: 'robert.brown@hospital.com', status: 'Active', patients: 19, image: 'https://randomuser.me/api/portraits/men/57.jpg' },
    { id: 'DR-1005', name: 'Dr. Jennifer Garcia', specialty: 'Oncology', department: 'Cancer Care', phone: '(555) 567-1234', email: 'jennifer.garcia@hospital.com', status: 'Active', patients: 31, image: 'https://randomuser.me/api/portraits/women/8.jpg' },
    { id: 'DR-1006', name: 'Dr. James Martinez', specialty: 'General Surgery', department: 'Surgery', phone: '(555) 678-2345', email: 'james.martinez@hospital.com', status: 'On Call', patients: 15, image: 'https://randomuser.me/api/portraits/men/33.jpg' },
  ]);

  const stats = [
    { title: 'Total Doctors', value: doctors.length.toString() },
    { title: 'Active Doctors', value: doctors.filter(d => d.status === 'Active').length.toString() },
    { title: 'On Leave', value: doctors.filter(d => d.status === 'On Leave').length.toString() },
    { title: 'On Call', value: doctors.filter(d => d.status === 'On Call').length.toString() },
  ];

  const handleAddDoctor = (doctorData: any) => {
    const newDoctor: Doctor = {
      id: `DR-${1000 + doctors.length + 1}`,
      name: doctorData.name,
      specialty: doctorData.specialty,
      department: doctorData.department,
      phone: doctorData.phone,
      email: doctorData.email,
      status: doctorData.status,
      patients: 0,
      image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,
    };
    
    setDoctors([...doctors, newDoctor]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Doctors</h1>
          <p className="text-muted-foreground">Manage hospital staff and doctors</p>
        </div>
        <Button onClick={() => setShowAddDoctorDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search doctors..." className="pl-8" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Patients</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={doctor.image} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.substring(4, 6)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-sm text-muted-foreground">{doctor.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>{doctor.department}</TableCell>
                  <TableCell>
                    <Badge variant={
                      doctor.status === 'Active' ? 'default' :
                      doctor.status === 'On Leave' ? 'secondary' :
                      'outline'
                    }>
                      {doctor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.patients}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Doctor Specialties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Cardiology</span>
                <span>8 Doctors</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span>Neurology</span>
                <span>6 Doctors</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span>Orthopedics</span>
                <span>5 Doctors</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span>Pediatrics</span>
                <span>7 Doctors</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span>Oncology</span>
                <span>4 Doctors</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On-Call Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <div key={day} className="flex items-center justify-between border-b pb-2">
                  <div className="font-medium">{day}</div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`} />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Dr. {['Williams', 'Taylor', 'Anderson', 'Thomas', 'Jackson'][Math.floor(Math.random() * 5)]}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AddDoctorDialog 
        open={showAddDoctorDialog}
        onOpenChange={setShowAddDoctorDialog}
        onAddDoctor={handleAddDoctor}
      />
    </div>
  );
};

export default Doctors;
