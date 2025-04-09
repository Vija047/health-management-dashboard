
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download, FileText, FileUp, FileCog } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Record {
  id: string;
  patientId: string;
  patientName: string;
  recordType: string;
  date: string;
  doctor: string;
  department: string;
  status: string;
  fileSize?: string;
}

const Records: React.FC = () => {
  const medicalRecords: Record[] = [
    { id: 'REC-1001', patientId: 'PT-1001', patientName: 'John Smith', recordType: 'Lab Report', date: '2025-04-05', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', status: 'Available', fileSize: '1.2 MB' },
    { id: 'REC-1002', patientId: 'PT-1003', patientName: 'Michael Brown', recordType: 'X-Ray Report', date: '2025-04-01', doctor: 'Dr. Robert Brown', department: 'Orthopedics', status: 'Available', fileSize: '3.5 MB' },
    { id: 'REC-1003', patientId: 'PT-1002', patientName: 'Sarah Johnson', recordType: 'Consultation Note', date: '2025-03-28', doctor: 'Dr. Emma Wilson', department: 'Pediatrics', status: 'Available', fileSize: '0.5 MB' },
    { id: 'REC-1004', patientId: 'PT-1004', patientName: 'Emily Davis', recordType: 'MRI Scan', date: '2025-03-25', doctor: 'Dr. Michael Lee', department: 'Neurology', status: 'Processing', fileSize: '7.8 MB' },
    { id: 'REC-1005', patientId: 'PT-1005', patientName: 'Robert Wilson', recordType: 'Blood Test', date: '2025-04-08', doctor: 'Dr. Jennifer Garcia', department: 'Oncology', status: 'Available', fileSize: '0.8 MB' },
    { id: 'REC-1006', patientId: 'PT-1001', patientName: 'John Smith', recordType: 'ECG Report', date: '2025-04-08', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', status: 'Available', fileSize: '1.5 MB' },
  ];

  const recentActivity = [
    { action: 'Record Created', recordId: 'REC-1006', user: 'Dr. Sarah Johnson', timestamp: '2025-04-08 14:32' },
    { action: 'Record Updated', recordId: 'REC-1005', user: 'Nurse Williams', timestamp: '2025-04-08 13:15' },
    { action: 'Record Viewed', recordId: 'REC-1002', user: 'Dr. Robert Brown', timestamp: '2025-04-08 11:40' },
    { action: 'Record Uploaded', recordId: 'REC-1005', user: 'Lab Technician Taylor', timestamp: '2025-04-08 09:22' },
    { action: 'Record Requested', recordId: 'REC-1001', user: 'Dr. Michael Lee', timestamp: '2025-04-07 16:45' },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
        <p className="text-muted-foreground">Manage patient medical records and documentation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <h3 className="text-2xl font-bold">1,453</h3>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Uploads This Week</p>
                <h3 className="text-2xl font-bold">87</h3>
              </div>
              <FileUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <FileCog className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search records..." className="pl-8" />
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
          <Button size="sm">
            <FileUp className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="lab">Lab Reports</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalRecords.map((record) => (
                    <TableRow key={record.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>
                        <div>
                          <div>{record.patientName}</div>
                          <div className="text-xs text-muted-foreground">{record.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{record.recordType}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === 'Available' ? 'outline' : 'secondary'}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.fileSize}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lab">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md border border-dashed border-gray-200">
                <div className="text-center">
                  <p className="text-muted-foreground">Filtered view for Lab Reports</p>
                  <p className="text-sm text-muted-foreground">2 records found</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="imaging">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md border border-dashed border-gray-200">
                <div className="text-center">
                  <p className="text-muted-foreground">Filtered view for Imaging Reports</p>
                  <p className="text-sm text-muted-foreground">2 records found</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md border border-dashed border-gray-200">
                <div className="text-center">
                  <p className="text-muted-foreground">Filtered view for Clinical Notes</p>
                  <p className="text-sm text-muted-foreground">1 record found</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-gray-100 rounded-full p-2">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {activity.action} - {activity.recordId}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground space-x-2">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Records;
