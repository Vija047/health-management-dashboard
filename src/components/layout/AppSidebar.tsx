
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from '@/components/ui/sidebar';
import { 
  Layout, 
  Users, 
  UserRound, 
  Calendar, 
  BedDouble, 
  FileText, 
  Receipt, 
  BarChart3
} from 'lucide-react';

const AppSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: Layout },
    { title: 'Patients', path: '/patients', icon: Users },
    { title: 'Doctors', path: '/doctors', icon: UserRound },
    { title: 'Appointments', path: '/appointments', icon: Calendar },
    { title: 'Wards', path: '/wards', icon: BedDouble },
    { title: 'Records', path: '/records', icon: FileText },
    { title: 'Billing', path: '/billing', icon: Receipt },
    { title: 'Reports', path: '/reports', icon: BarChart3 },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold">HMS</span>
          </div>
          <div className="font-bold text-lg">MediCare</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    className={location.pathname === item.path ? "bg-sidebar-accent text-primary" : ""} 
                    asChild
                  >
                    <Link to={item.path}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
