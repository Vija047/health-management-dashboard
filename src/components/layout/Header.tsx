
import React, { useState } from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SettingsMenu from './SettingsMenu';
import ProfileView from '../users/ProfileView';

const Header: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="relative md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-gray-50 border-0"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
          
          <SettingsMenu>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings size={20} className="text-gray-600" />
            </button>
          </SettingsMenu>
          
          <Avatar 
            className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all" 
            onClick={() => setProfileOpen(true)}
          >
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <ProfileView open={profileOpen} onOpenChange={setProfileOpen} />
    </header>
  );
};

export default Header;
