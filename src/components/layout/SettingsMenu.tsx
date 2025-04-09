
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Palette, 
  Shield, 
  HelpCircle 
} from 'lucide-react';
import { toast } from "sonner";

interface SettingsMenuProps {
  children: React.ReactNode;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ children }) => {
  const handleItemClick = (label: string) => {
    toast.success(`${label} settings opened`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="grid gap-1">
          <Button 
            variant="ghost" 
            className="flex w-full justify-start gap-2 text-sm" 
            onClick={() => handleItemClick("Account")}
          >
            <User size={16} />
            Account Settings
          </Button>
          <Button 
            variant="ghost" 
            className="flex w-full justify-start gap-2 text-sm" 
            onClick={() => handleItemClick("Notifications")}
          >
            <Bell size={16} />
            Notifications
          </Button>
          <Button 
            variant="ghost" 
            className="flex w-full justify-start gap-2 text-sm" 
            onClick={() => handleItemClick("Appearance")}
          >
            <Palette size={16} />
            Appearance
          </Button>
          <Button 
            variant="ghost" 
            className="flex w-full justify-start gap-2 text-sm" 
            onClick={() => handleItemClick("Display")}
          >
            <Moon size={16} />
            Dark Mode
          </Button>
          <Button 
            variant="ghost" 
            className="flex w-full justify-start gap-2 text-sm" 
            onClick={() => handleItemClick("Security")}
          >
            <Shield size={16} />
            Security
          </Button>
          <Button 
            variant="ghost" 
            className="flex w-full justify-start gap-2 text-sm" 
            onClick={() => handleItemClick("Help")}
          >
            <HelpCircle size={16} />
            Help & Support
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SettingsMenu;
