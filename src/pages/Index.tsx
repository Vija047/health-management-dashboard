
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Activity, Users, FileText, Calendar, BedDouble, Receipt, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  // Feature overview for the HMS
  const features = [
    {
      title: 'Dashboard',
      description: 'Get a complete overview of hospital operations and key metrics.',
      icon: Activity,
      color: 'bg-blue-500',
      link: '/dashboard'
    },
    {
      title: 'Patient Management',
      description: 'Register and manage patient information efficiently.',
      icon: Users,
      color: 'bg-green-500',
      link: '/patients'
    },
    {
      title: 'Doctor Directory',
      description: 'Access and manage information about hospital staff and doctors.',
      icon: Users,
      color: 'bg-yellow-500',
      link: '/doctors'
    },
    {
      title: 'Appointment Scheduling',
      description: 'Schedule and manage patient appointments with doctors.',
      icon: Calendar,
      color: 'bg-purple-500',
      link: '/appointments'
    },
    {
      title: 'Ward Management',
      description: 'Monitor and manage hospital wards and bed allocation.',
      icon: BedDouble,
      color: 'bg-pink-500',
      link: '/wards'
    },
    {
      title: 'Medical Records',
      description: 'Access and update patient medical records securely.',
      icon: FileText,
      color: 'bg-indigo-500',
      link: '/records'
    },
    {
      title: 'Billing & Invoices',
      description: 'Process patient billing and manage financial transactions.',
      icon: Receipt,
      color: 'bg-red-500',
      link: '/billing'
    },
    {
      title: 'Reports & Analytics',
      description: 'Generate insights with detailed reports and analytics.',
      icon: BarChart3,
      color: 'bg-cyan-500',
      link: '/reports'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero section */}
      <section className="py-12 px-6 md:px-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg mb-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to MediCare</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            A comprehensive hospital management system designed to streamline healthcare operations
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-blue-50">
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white/20">
              <Link to="/patients">
                Manage Patients
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="mb-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Complete Hospital Management Solution</h2>
          <p className="text-gray-500">Explore our comprehensive set of tools to manage your healthcare facility</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="block no-underline">
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 mb-4 flex-1">{feature.description}</p>
                  <div className="flex items-center text-primary font-medium mt-auto">
                    <span>Explore</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-gray-50 rounded-lg p-8 mb-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Why Choose MediCare HMS?</h2>
          <p className="text-gray-500">Our system is trusted by healthcare providers worldwide</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500+', label: 'Hospitals' },
            { value: '10,000+', label: 'Healthcare Providers' },
            { value: '1M+', label: 'Patients Managed' },
            { value: '99.9%', label: 'System Uptime' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="text-center bg-gray-900 text-white rounded-lg p-10">
        <h2 className="text-2xl font-bold mb-4">Ready to optimize your healthcare operations?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Start using our comprehensive hospital management system to improve efficiency, enhance patient care, and better manage your resources.
        </p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
          <Link to="/dashboard">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
