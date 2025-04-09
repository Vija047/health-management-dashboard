
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Plus, Search, Filter, Download, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PatientStatus = {
  ACTIVE: 'Active',
  DISCHARGED: 'Discharged',
  ADMITTED: 'Admitted',
  CRITICAL: 'Critical',
  SCHEDULED: 'Scheduled'
};

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  status: string;
  date: string;
}

const patientFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.coerce.number().min(0).max(120, { message: "Age must be between 0 and 120." }),
  gender: z.string().min(1, { message: "Please select a gender." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  status: z.string().min(1, { message: "Please select a status." }),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

const Patients: React.FC = () => {
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([
    { id: 'PT-1001', name: 'John Smith', age: 45, gender: 'Male', phone: '(555) 123-4567', email: 'john@example.com', address: '123 Main St, Anytown', status: PatientStatus.ACTIVE, date: '2025-03-15' },
    { id: 'PT-1002', name: 'Sarah Johnson', age: 32, gender: 'Female', phone: '(555) 234-5678', email: 'sarah@example.com', address: '456 Oak Ave, Somewhere', status: PatientStatus.ADMITTED, date: '2025-03-28' },
    { id: 'PT-1003', name: 'Michael Brown', age: 60, gender: 'Male', phone: '(555) 345-6789', email: 'michael@example.com', address: '789 Pine Rd, Elsewhere', status: PatientStatus.DISCHARGED, date: '2025-04-02' },
    { id: 'PT-1004', name: 'Emily Davis', age: 28, gender: 'Female', phone: '(555) 456-7890', email: 'emily@example.com', address: '101 Maple Dr, Nowhere', status: PatientStatus.SCHEDULED, date: '2025-04-10' },
    { id: 'PT-1005', name: 'Robert Wilson', age: 72, gender: 'Male', phone: '(555) 567-8901', email: 'robert@example.com', address: '202 Elm St, Somewhere', status: PatientStatus.CRITICAL, date: '2025-04-05' },
    { id: 'PT-1006', name: 'Jennifer Lee', age: 39, gender: 'Female', phone: '(555) 678-9012', email: 'jennifer@example.com', address: '303 Cedar Ln, Anytown', status: PatientStatus.ACTIVE, date: '2025-03-20' },
    { id: 'PT-1007', name: 'David Miller', age: 51, gender: 'Male', phone: '(555) 789-0123', email: 'david@example.com', address: '404 Birch Ave, Elsewhere', status: PatientStatus.ADMITTED, date: '2025-04-01' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: '',
      age: 0,
      gender: '',
      phone: '',
      email: '',
      address: '',
      status: '',
    },
  });

  const handleAddPatient = (data: PatientFormValues) => {
    // Generate a unique ID (in a real app, this would come from the backend)
    const newId = `PT-${1000 + patients.length + 1}`;
    
    // Create a new patient object
    const newPatient: Patient = {
      id: newId,
      name: data.name,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      email: data.email || '',
      address: data.address || '',
      status: data.status,
      date: new Date().toISOString().split('T')[0], // Current date
    };
    
    // Add the new patient to the patients array
    setPatients([newPatient, ...patients]);
    
    // Reset the form
    form.reset();
    
    // Close the dialog
    setShowAddPatient(false);
    
    // Show a success toast
    toast({
      title: "Patient Added",
      description: "The patient has been successfully added to the system.",
    });
  };

  const filteredPatients = searchQuery
    ? patients.filter(patient => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        patient.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : patients;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patient Management</h1>
          <p className="text-muted-foreground">View and manage all patients</p>
        </div>
        <Button onClick={() => setShowAddPatient(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search patients..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>
                      <Badge variant={
                        patient.status === PatientStatus.ACTIVE ? "outline" :
                        patient.status === PatientStatus.DISCHARGED ? "secondary" :
                        patient.status === PatientStatus.ADMITTED ? "default" :
                        patient.status === PatientStatus.CRITICAL ? "destructive" :
                        "outline"
                      }>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{patient.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    No patients found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showAddPatient} onOpenChange={setShowAddPatient}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              Enter the patient's information below. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddPatient)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="45" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="patient@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={PatientStatus.ACTIVE}>Active</SelectItem>
                          <SelectItem value={PatientStatus.SCHEDULED}>Scheduled</SelectItem>
                          <SelectItem value={PatientStatus.ADMITTED}>Admitted</SelectItem>
                          <SelectItem value={PatientStatus.DISCHARGED}>Discharged</SelectItem>
                          <SelectItem value={PatientStatus.CRITICAL}>Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => {
                  form.reset();
                  setShowAddPatient(false);
                }}>
                  Cancel
                </Button>
                <Button type="submit">Add Patient</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Patients;
