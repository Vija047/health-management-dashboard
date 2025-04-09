
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Plus, Calendar, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  NO_SHOW = 'No Show'
}

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  patientImage?: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage?: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason: string;
}

const Appointments: React.FC = () => {
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const { toast } = useToast();

  const appointments: Appointment[] = [
    {
      id: 'APT-1001',
      patientName: 'John Smith',
      patientId: 'PT-1001',
      patientImage: 'https://randomuser.me/api/portraits/men/45.jpg',
      doctorName: 'Dr. Sarah Johnson',
      doctorSpecialty: 'Cardiology',
      doctorImage: 'https://randomuser.me/api/portraits/women/32.jpg',
      date: '2025-04-10',
      time: '09:00 AM',
      status: AppointmentStatus.SCHEDULED,
      reason: 'Annual checkup'
    },
    {
      id: 'APT-1002',
      patientName: 'Emily Davis',
      patientId: 'PT-1004',
      patientImage: 'https://randomuser.me/api/portraits/women/22.jpg',
      doctorName: 'Dr. Michael Lee',
      doctorSpecialty: 'Neurology',
      doctorImage: 'https://randomuser.me/api/portraits/men/18.jpg',
      date: '2025-04-10',
      time: '10:30 AM',
      status: AppointmentStatus.SCHEDULED,
      reason: 'Headache consultation'
    },
    {
      id: 'APT-1003',
      patientName: 'Robert Wilson',
      patientId: 'PT-1005',
      patientImage: 'https://randomuser.me/api/portraits/men/63.jpg',
      doctorName: 'Dr. Jennifer Garcia',
      doctorSpecialty: 'Oncology',
      doctorImage: 'https://randomuser.me/api/portraits/women/8.jpg',
      date: '2025-04-09',
      time: '02:00 PM',
      status: AppointmentStatus.COMPLETED,
      reason: 'Follow-up appointment'
    },
    {
      id: 'APT-1004',
      patientName: 'Sarah Johnson',
      patientId: 'PT-1002',
      patientImage: 'https://randomuser.me/api/portraits/women/41.jpg',
      doctorName: 'Dr. Robert Brown',
      doctorSpecialty: 'Orthopedics',
      doctorImage: 'https://randomuser.me/api/portraits/men/57.jpg',
      date: '2025-04-08',
      time: '11:15 AM',
      status: AppointmentStatus.CANCELLED,
      reason: 'Joint pain'
    },
    {
      id: 'APT-1005',
      patientName: 'Michael Brown',
      patientId: 'PT-1003',
      patientImage: 'https://randomuser.me/api/portraits/men/31.jpg',
      doctorName: 'Dr. Emma Wilson',
      doctorSpecialty: 'Pediatrics',
      doctorImage: 'https://randomuser.me/api/portraits/women/45.jpg',
      date: '2025-04-09',
      time: '03:45 PM',
      status: AppointmentStatus.NO_SHOW,
      reason: 'Vaccination'
    },
  ];

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);
  
  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddAppointment(false);
    toast({
      title: "Appointment Scheduled",
      description: "The appointment has been successfully scheduled.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage patient appointments</p>
        </div>
        <Button onClick={() => setShowAddAppointment(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Today's Appointments</p>
                <h3 className="text-2xl font-bold">{todayAppointments.length}</h3>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming This Week</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <h3 className="text-2xl font-bold">89%</h3>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search appointments..." className="pl-8" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={appointment.patientImage} />
                        <AvatarFallback>{appointment.patientName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{appointment.patientName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={appointment.doctorImage} />
                        <AvatarFallback>{appointment.doctorName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm">{appointment.doctorName}</div>
                        <div className="text-xs text-muted-foreground">{appointment.doctorSpecialty}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <Badge variant={
                      appointment.status === AppointmentStatus.SCHEDULED ? 'default' :
                      appointment.status === AppointmentStatus.COMPLETED ? 'outline' :
                      appointment.status === AppointmentStatus.CANCELLED ? 'secondary' :
                      'destructive'
                    }>
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {appointment.reason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showAddAppointment} onOpenChange={setShowAddAppointment}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule New Appointment</DialogTitle>
            <DialogDescription>
              Fill in the details below to schedule a new appointment.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddAppointment}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="patient" className="text-sm font-medium">Patient</label>
                <select id="patient" className="w-full p-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Patient</option>
                  <option value="PT-1001">John Smith (PT-1001)</option>
                  <option value="PT-1002">Sarah Johnson (PT-1002)</option>
                  <option value="PT-1003">Michael Brown (PT-1003)</option>
                  <option value="PT-1004">Emily Davis (PT-1004)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="doctor" className="text-sm font-medium">Doctor</label>
                <select id="doctor" className="w-full p-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Doctor</option>
                  <option value="DR-1001">Dr. Sarah Johnson (Cardiology)</option>
                  <option value="DR-1002">Dr. Michael Lee (Neurology)</option>
                  <option value="DR-1003">Dr. Emma Wilson (Pediatrics)</option>
                  <option value="DR-1004">Dr. Robert Brown (Orthopedics)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Date</label>
                <Input id="date" type="date" min={today} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">Time</label>
                <Input id="time" type="time" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="reason" className="text-sm font-medium">Reason for Visit</label>
                <Input id="reason" placeholder="Brief description of the reason for appointment" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="notes" className="text-sm font-medium">Additional Notes</label>
                <textarea
                  id="notes"
                  className="w-full rounded-md border border-gray-200 p-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Any additional information or special requirements"
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowAddAppointment(false)}>Cancel</Button>
              <Button type="submit">Schedule Appointment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
