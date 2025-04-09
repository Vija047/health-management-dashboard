
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BedDouble, User, UserRound, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Ward {
  id: string;
  name: string;
  totalBeds: number;
  occupiedBeds: number;
  reservedBeds: number;
  underMaintenance: number;
  nurseInCharge: string;
  status: 'Operational' | 'Limited' | 'Maintenance';
}

interface Patient {
  id: string;
  name: string;
  wardId: string;
  bedNumber: string;
  admissionDate: string;
  condition: 'Stable' | 'Critical' | 'Serious' | 'Fair';
  doctor: string;
}

const Wards: React.FC = () => {
  const wards: Ward[] = [
    { id: 'W-101', name: 'General Ward', totalBeds: 30, occupiedBeds: 24, reservedBeds: 3, underMaintenance: 0, nurseInCharge: 'Nurse Johnson', status: 'Operational' },
    { id: 'W-102', name: 'Pediatric Ward', totalBeds: 20, occupiedBeds: 12, reservedBeds: 2, underMaintenance: 1, nurseInCharge: 'Nurse Williams', status: 'Operational' },
    { id: 'W-103', name: 'Maternity Ward', totalBeds: 15, occupiedBeds: 10, reservedBeds: 2, underMaintenance: 0, nurseInCharge: 'Nurse Davis', status: 'Operational' },
    { id: 'W-104', name: 'ICU', totalBeds: 10, occupiedBeds: 9, reservedBeds: 1, underMaintenance: 0, nurseInCharge: 'Nurse Martinez', status: 'Limited' },
    { id: 'W-105', name: 'Surgical Ward', totalBeds: 25, occupiedBeds: 18, reservedBeds: 3, underMaintenance: 2, nurseInCharge: 'Nurse Taylor', status: 'Operational' },
    { id: 'W-106', name: 'Cardiology Ward', totalBeds: 20, occupiedBeds: 13, reservedBeds: 3, underMaintenance: 0, nurseInCharge: 'Nurse Anderson', status: 'Operational' },
  ];

  const recentAdmissions: Patient[] = [
    { id: 'PT-1042', name: 'John Smith', wardId: 'W-101', bedNumber: '101-05', admissionDate: '2025-04-07', condition: 'Stable', doctor: 'Dr. Sarah Johnson' },
    { id: 'PT-1046', name: 'Mary Williams', wardId: 'W-103', bedNumber: '103-02', admissionDate: '2025-04-08', condition: 'Fair', doctor: 'Dr. James Martinez' },
    { id: 'PT-1051', name: 'Robert Davis', wardId: 'W-104', bedNumber: '104-06', admissionDate: '2025-04-09', condition: 'Critical', doctor: 'Dr. Michael Lee' },
    { id: 'PT-1053', name: 'Patricia Miller', wardId: 'W-106', bedNumber: '106-11', admissionDate: '2025-04-09', condition: 'Stable', doctor: 'Dr. Jennifer Garcia' },
  ];

  const totalBeds = wards.reduce((acc, ward) => acc + ward.totalBeds, 0);
  const occupiedBeds = wards.reduce((acc, ward) => acc + ward.occupiedBeds, 0);
  const availableBeds = totalBeds - occupiedBeds - wards.reduce((acc, ward) => acc + ward.reservedBeds + ward.underMaintenance, 0);
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Wards Management</h1>
        <p className="text-muted-foreground">Manage hospital wards and bed allocation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Beds</p>
                <h3 className="text-2xl font-bold">{totalBeds}</h3>
              </div>
              <BedDouble className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Occupied Beds</p>
                <h3 className="text-2xl font-bold">{occupiedBeds}</h3>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Available Beds</p>
                <h3 className="text-2xl font-bold">{availableBeds}</h3>
              </div>
              <BedDouble className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <h3 className="text-2xl font-bold">{occupancyRate}%</h3>
              </div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                occupancyRate > 90 ? 'bg-red-100 text-red-700' : 
                occupancyRate > 75 ? 'bg-yellow-100 text-yellow-700' : 
                'bg-green-100 text-green-700'
              }`}>
                {occupancyRate > 90 ? <AlertTriangle size={18} /> : <UserRound size={18} />}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ward Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wards.map((ward) => {
                const occupancyPercentage = Math.round((ward.occupiedBeds / ward.totalBeds) * 100);
                let statusColor = 'bg-green-500';
                if (occupancyPercentage > 90) statusColor = 'bg-red-500';
                else if (occupancyPercentage > 75) statusColor = 'bg-yellow-500';
                
                return (
                  <div key={ward.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">{ward.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">({ward.id})</span>
                      </div>
                      <Badge variant={
                        ward.status === 'Operational' ? 'default' :
                        ward.status === 'Limited' ? 'secondary' :
                        'outline'
                      }>
                        {ward.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress value={occupancyPercentage} className={statusColor} />
                      <span className="text-sm font-medium">{ward.occupiedBeds}/{ward.totalBeds} beds</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {ward.nurseInCharge} • {ward.occupiedBeds} occupied • {ward.reservedBeds} reserved • {ward.underMaintenance} maintenance
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Ward</TableHead>
                  <TableHead>Bed</TableHead>
                  <TableHead>Condition</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAdmissions.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-xs text-muted-foreground">{patient.id}</div>
                    </TableCell>
                    <TableCell>
                      {patient.wardId} • {wards.find(w => w.id === patient.wardId)?.name}
                    </TableCell>
                    <TableCell>{patient.bedNumber}</TableCell>
                    <TableCell>
                      <Badge variant={
                        patient.condition === 'Stable' ? 'outline' :
                        patient.condition === 'Fair' ? 'secondary' :
                        patient.condition === 'Serious' ? 'default' :
                        'destructive'
                      }>
                        {patient.condition}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ward Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 30 }).map((_, i) => {
                const status = Math.random() > 0.3 ? 'occupied' : Math.random() > 0.5 ? 'available' : 'reserved';
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-md flex items-center justify-center border ${
                      status === 'occupied' ? 'bg-blue-100 border-blue-300 text-blue-800' :
                      status === 'reserved' ? 'bg-yellow-50 border-yellow-300 text-yellow-800' :
                      'bg-green-50 border-green-300 text-green-800'
                    }`}
                  >
                    <div className="text-center">
                      <BedDouble size={20} className="mx-auto" />
                      <span className="text-xs">{101 + i}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-center gap-8">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-sm mr-2"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-green-50 border border-green-300 rounded-sm mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-yellow-50 border border-yellow-300 rounded-sm mr-2"></div>
                <span>Reserved</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wards;
