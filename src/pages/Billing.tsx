
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, DollarSign, CreditCard, Receipt, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

enum InvoiceStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  OVERDUE = 'Overdue',
  REJECTED = 'Rejected'
}

interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

const Billing: React.FC = () => {
  const [showInvoiceDetails, setShowInvoiceDetails] = useState<Invoice | null>(null);
  const { toast } = useToast();
  
  const invoices: Invoice[] = [
    { 
      id: 'INV-1001', 
      patientId: 'PT-1001', 
      patientName: 'John Smith', 
      date: '2025-04-01', 
      dueDate: '2025-04-15', 
      amount: 1250.00, 
      status: InvoiceStatus.PAID,
      items: [
        { description: 'Consultation Fee', quantity: 1, unitPrice: 200, total: 200 },
        { description: 'ECG Test', quantity: 1, unitPrice: 350, total: 350 },
        { description: 'Blood Work', quantity: 1, unitPrice: 450, total: 450 },
        { description: 'Medication', quantity: 5, unitPrice: 50, total: 250 },
      ]
    },
    { 
      id: 'INV-1002', 
      patientId: 'PT-1003', 
      patientName: 'Michael Brown', 
      date: '2025-04-03', 
      dueDate: '2025-04-17', 
      amount: 3200.00, 
      status: InvoiceStatus.PENDING,
      items: [
        { description: 'MRI Scan', quantity: 1, unitPrice: 2500, total: 2500 },
        { description: 'Consultation Fee', quantity: 1, unitPrice: 200, total: 200 },
        { description: 'Medication', quantity: 10, unitPrice: 50, total: 500 },
      ]
    },
    { 
      id: 'INV-1003', 
      patientId: 'PT-1004', 
      patientName: 'Emily Davis', 
      date: '2025-03-25', 
      dueDate: '2025-04-08', 
      amount: 750.00, 
      status: InvoiceStatus.OVERDUE,
      items: [
        { description: 'Consultation Fee', quantity: 1, unitPrice: 200, total: 200 },
        { description: 'X-Ray', quantity: 1, unitPrice: 300, total: 300 },
        { description: 'Medication', quantity: 5, unitPrice: 50, total: 250 },
      ]
    },
    { 
      id: 'INV-1004', 
      patientId: 'PT-1002', 
      patientName: 'Sarah Johnson', 
      date: '2025-04-05', 
      dueDate: '2025-04-19', 
      amount: 1800.00, 
      status: InvoiceStatus.PENDING,
      items: [
        { description: 'Consultation Fee', quantity: 1, unitPrice: 200, total: 200 },
        { description: 'Surgery - Minor', quantity: 1, unitPrice: 1500, total: 1500 },
        { description: 'Medication', quantity: 2, unitPrice: 50, total: 100 },
      ]
    },
    { 
      id: 'INV-1005', 
      patientId: 'PT-1005', 
      patientName: 'Robert Wilson', 
      date: '2025-04-07', 
      dueDate: '2025-04-21', 
      amount: 4500.00, 
      status: InvoiceStatus.PAID,
      items: [
        { description: 'Consultation Fee', quantity: 1, unitPrice: 200, total: 200 },
        { description: 'Surgery - Major', quantity: 1, unitPrice: 3500, total: 3500 },
        { description: 'Hospital Stay (2 days)', quantity: 2, unitPrice: 250, total: 500 },
        { description: 'Medication', quantity: 6, unitPrice: 50, total: 300 },
      ]
    },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 42000 },
    { name: 'Feb', revenue: 38000 },
    { name: 'Mar', revenue: 45000 },
    { name: 'Apr', revenue: 39000 },
    { name: 'May', revenue: 47000 },
    { name: 'Jun', revenue: 52000 },
    { name: 'Jul', revenue: 56000 },
  ];

  const handleMarkAsPaid = (invoice: Invoice) => {
    toast({
      title: "Payment Recorded",
      description: `Invoice ${invoice.id} has been marked as paid.`,
    });
    setShowInvoiceDetails(null);
  };

  const calculateTotal = (items: Invoice['items']) => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing & Invoices</h1>
        <p className="text-muted-foreground">Manage hospital billing and financial transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <h3 className="text-2xl font-bold">$56,450</h3>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
                <h3 className="text-2xl font-bold">$12,380</h3>
              </div>
              <CreditCard className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <h3 className="text-2xl font-bold">$3,750</h3>
              </div>
              <Receipt className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#38bdf8" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search invoices..." className="pl-8" />
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
            <Receipt className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="p-0 hover:bg-transparent">
                    Invoice
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 hover:bg-transparent">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 hover:bg-transparent">
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{invoice.patientName}</div>
                      <div className="text-xs text-muted-foreground">{invoice.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      invoice.status === InvoiceStatus.PAID ? 'outline' :
                      invoice.status === InvoiceStatus.PENDING ? 'default' :
                      invoice.status === InvoiceStatus.OVERDUE ? 'destructive' :
                      'secondary'
                    }>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => setShowInvoiceDetails(invoice)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!showInvoiceDetails} onOpenChange={() => setShowInvoiceDetails(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {showInvoiceDetails && (
            <>
              <DialogHeader>
                <DialogTitle>Invoice {showInvoiceDetails.id}</DialogTitle>
                <DialogDescription>
                  Details for invoice {showInvoiceDetails.id} for {showInvoiceDetails.patientName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">Billed To</p>
                    <p className="text-sm">{showInvoiceDetails.patientName}</p>
                    <p className="text-sm text-muted-foreground">{showInvoiceDetails.patientId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Invoice Details</p>
                    <p className="text-sm">Date: {showInvoiceDetails.date}</p>
                    <p className="text-sm">Due Date: {showInvoiceDetails.dueDate}</p>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {showInvoiceDetails.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">${item.unitPrice.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${item.total.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                        <TableCell className="text-right font-bold">${calculateTotal(showInvoiceDetails.items).toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge variant={
                    showInvoiceDetails.status === InvoiceStatus.PAID ? 'outline' :
                    showInvoiceDetails.status === InvoiceStatus.PENDING ? 'default' :
                    showInvoiceDetails.status === InvoiceStatus.OVERDUE ? 'destructive' :
                    'secondary'
                  }>
                    {showInvoiceDetails.status}
                  </Badge>
                  
                  {showInvoiceDetails.status !== InvoiceStatus.PAID && (
                    <div className="text-sm text-muted-foreground">
                      {showInvoiceDetails.status === InvoiceStatus.OVERDUE ? 
                        "This invoice is overdue. Please process payment as soon as possible." :
                        "Payment is due by " + showInvoiceDetails.dueDate}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInvoiceDetails(null)}>Close</Button>
                {showInvoiceDetails.status !== InvoiceStatus.PAID && (
                  <Button onClick={() => handleMarkAsPaid(showInvoiceDetails)}>Mark as Paid</Button>
                )}
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
