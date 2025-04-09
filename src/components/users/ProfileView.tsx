
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, MapPin, Award, LogOut } from 'lucide-react';

interface ProfileViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ open, onOpenChange }) => {
  const handleSignOut = () => {
    // In a real app, this would handle signing out
    console.log('Signing out...');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            Your personal information and settings
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/shadcn.png" alt="Dr. Sarah Johnson" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <h3 className="text-lg font-medium">Dr. Sarah Johnson</h3>
            <p className="text-sm text-muted-foreground">Chief Medical Officer</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-muted-foreground" />
            <span className="text-sm">sarah.johnson@medicare.org</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-muted-foreground" />
            <span className="text-sm">+1 (555) 123-4567</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-muted-foreground" />
            <span className="text-sm">Joined January 2021</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-muted-foreground" />
            <span className="text-sm">San Francisco, CA</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Award size={18} className="text-muted-foreground" />
            <span className="text-sm">Cardiology, Internal Medicine</span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut size={16} />
            Sign out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileView;
