import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [apiEndpoint, setApiEndpoint] = useState("https://api.lmai.example.com");
  const [smtpServer, setSmtpServer] = useState("smtp.example.com");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUsername, setSmtpUsername] = useState("notifications@example.com");
  const [smtpPassword, setSmtpPassword] = useState("**********");
  const [emailFrom, setEmailFrom] = useState("notifications@example.com");
  const [emailSubjectPrefix, setEmailSubjectPrefix] = useState("[LMAI] ");
  const [emailFooter, setEmailFooter] = useState("This is an automated message from the LMAI system. Please do not reply to this email.");
  
  const [notifyExpiring, setNotifyExpiring] = useState(true);
  const [notifyDays, setNotifyDays] = useState("30");
  const [notifyAdmins, setNotifyAdmins] = useState(true);
  const [notifyEnterprises, setNotifyEnterprises] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully.",
      variant: "default",
    });
  };
  
  const handleSaveEmail = () => {
    toast({
      title: "Email settings saved",
      description: "Email configuration has been updated successfully.",
      variant: "default",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Notification preferences have been updated successfully.",
      variant: "default",
    });
  };
  
  const handleTestEmail = () => {
    toast({
      title: "Test email sent",
      description: "A test email has been sent to the admin address.",
      variant: "default",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-nunito font-bold text-[#5A3A1C]">Settings</h2>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md bg-[#F5EAD8]">
          <TabsTrigger 
            value="general" 
            className="data-[state=active]:bg-[#8B5A2B] data-[state=active]:text-white"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="email" 
            className="data-[state=active]:bg-[#8B5A2B] data-[state=active]:text-white"
          >
            Email
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:bg-[#8B5A2B] data-[state=active]:text-white"
          >
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-nunito text-[#5A3A1C]">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiEndpoint" className="text-[#704923]">API Endpoint</Label>
                    <Input 
                      id="apiEndpoint" 
                      value={apiEndpoint} 
                      onChange={(e) => setApiEndpoint(e.target.value)}
                      className="border-[#D2B48C] focus-[#A67C52]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout" className="text-[#704923]">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout" 
                      type="number" 
                      value={sessionTimeout} 
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="border-[#D2B48C] focus-[#A67C52]"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="darkMode" 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode} 
                    className="data-[state=checked]:bg-[#8B5A2B]"
                  />
                  <Label htmlFor="darkMode" className="text-[#704923]">Enable Dark Mode</Label>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  type="button" 
                  onClick={handleSaveGeneral}
                  className="bg-[#8B5A2B] hover-[#704923]"
                >
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-nunito text-[#5A3A1C]">Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer" className="text-[#704923]">SMTP Server</Label>
                    <Input 
                      id="smtpServer" 
                      value={smtpServer} 
                      onChange={(e) => setSmtpServer(e.target.value)}
                      className="border-[#D2B48C] focus-[#A67C52]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort" className="text-[#704923]">SMTP Port</Label>
                    <Input 
                      id="smtpPort" 
                      value={smtpPort} 
                      onChange={(e) => setSmtpPort(e.target.value)}
                      className="border-[#D2B48C] focus-[#A67C52]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername" className="text-[#704923]">SMTP Username</Label>
                    <Input 
                      id="smtpUsername" 
                      value={smtpUsername} 
                      onChange={(e) => setSmtpUsername(e.target.value)}
                      className="border-[#D2B48C] focus-[#A67C52]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword" className="text-[#704923]">SMTP Password</Label>
                    <Input 
                      id="smtpPassword" 
                      type="password" 
                      value={smtpPassword} 
                      onChange={(e) => setSmtpPassword(e.target.value)}
                      className="border-[#D2B48C] focus-[#A67C52]"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailFrom" className="text-[#704923]">Email From</Label>
                  <Input 
                    id="emailFrom" 
                    value={emailFrom} 
                    onChange={(e) => setEmailFrom(e.target.value)}
                    className="border-[#D2B48C] focus-[#A67C52]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailSubjectPrefix" className="text-[#704923]">Email Subject Prefix</Label>
                  <Input 
                    id="emailSubjectPrefix" 
                    value={emailSubjectPrefix} 
                    onChange={(e) => setEmailSubjectPrefix(e.target.value)}
                    className="border-[#D2B48C] focus-[#A67C52]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailFooter" className="text-[#704923]">Email Footer</Label>
                  <Textarea 
                    id="emailFooter" 
                    value={emailFooter} 
                    onChange={(e) => setEmailFooter(e.target.value)}
                    className="border-[#D2B48C] focus-[#A67C52]"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleTestEmail}
                  className="border-[#D2B48C] text-[#704923] hover-[#FAF6F1]"
                >
                  Send Test Email
                </Button>
                <Button 
                  type="button" 
                  onClick={handleSaveEmail}
                  className="bg-[#8B5A2B] hover-[#704923]"
                >
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-nunito text-[#5A3A1C]">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#704923]">License Expiration Notifications</Label>
                    <p className="text-sm text-[#A67C52]">Send notifications when licenses are about to expire</p>
                  </div>
                  <Switch 
                    checked={notifyExpiring} 
                    onCheckedChange={setNotifyExpiring} 
                    className="data-[state=checked]:bg-[#8B5A2B]"
                  />
                </div>
                
                {notifyExpiring && (
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="notifyDays" className="text-[#704923]">Days Before Expiration</Label>
                    <Input 
                      id="notifyDays" 
                      type="number" 
                      value={notifyDays} 
                      onChange={(e) => setNotifyDays(e.target.value)}
                      className="border-[#D2B48C] focus-[#A67C52] max-w-[200px]"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#704923]">Notify Administrators</Label>
                    <p className="text-sm text-[#A67C52]">Send email notifications to admin users</p>
                  </div>
                  <Switch 
                    checked={notifyAdmins} 
                    onCheckedChange={setNotifyAdmins} 
                    className="data-[state=checked]:bg-[#8B5A2B]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#704923]">Notify Enterprises</Label>
                    <p className="text-sm text-[#A67C52]">Send email notifications to enterprise contacts</p>
                  </div>
                  <Switch 
                    checked={notifyEnterprises} 
                    onCheckedChange={setNotifyEnterprises} 
                    className="data-[state=checked]:bg-[#8B5A2B]"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  type="button" 
                  onClick={handleSaveNotifications}
                  className="bg-[#8B5A2B] hover-[#704923]"
                >
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
