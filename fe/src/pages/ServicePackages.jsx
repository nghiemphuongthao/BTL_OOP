import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { mockPackages, mockServices } from "../lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  serviceId: z.string().min(1, "Service must be selected"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  duration: z.string().min(1, "Duration must be selected"),
  price: z.string().min(1, "Price is required"),
});


export default function ServicePackages() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editPackage, setEditPackage] = useState<any | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      serviceId: "",
      description: "",
      duration: "",
      price: "",
    },
  });

  const handleNewPackage = () => {
    form.reset({
      name: "",
      serviceId: "",
      description: "",
      duration: "",
      price: "",
    });
    setEditPackage(null);
    setIsFormOpen(true);
  };

  const handleEditPackage = (pkg) => {
    form.reset({
      name: pkg.name,
      serviceId: pkg.serviceId.toString(),
      description: pkg.description || "",
      duration: pkg.duration || "",
      price: pkg.price?.toString() || "",
    });
    setEditPackage(pkg);
    setIsFormOpen(true);
  };

  const onSubmit = (values) => {
    const operation = editPackage ? "updated" : "created";
    
    toast({
      title: `Service Package ${operation}`,
      description: `Package "${values.name}" has been successfully ${operation}.`,
      variant: "default",
    });
    
    setIsFormOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-nunito font-bold text-[#5A3A1C]">Service Packages</h2>
        <Button 
          className="bg-[#8B5A2B] hover-[#704923] flex items-center"
          onClick={handleNewPackage}
        >
          <span className="material-icons text-sm mr-2">add</span>
          <span>Add Package</span>
        </Button>
      </div>

      <Card className="mb-6 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-nunito text-[#5A3A1C]">Package Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Input 
                placeholder="Search packages..." 
                className="pl-8 border-[#D2B48C] focus-[#A67C52]"
              />
              <span className="material-icons absolute left-2 top-2.5 text-[#C19A6B] text-sm">search</span>
            </div>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="w-[180px] border-[#D2B48C]">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {mockServices.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-[#D2B48C] text-[#704923] hover-[#FAF6F1]">
                <span className="material-icons text-sm mr-1">filter_list</span>
                <span>Filter</span>
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#FAF6F1]">
                <TableRow>
                  <TableHead className="text-[#704923]">Package Name</TableHead>
                  <TableHead className="text-[#704923]">Service</TableHead>
                  <TableHead className="text-[#704923]">Duration</TableHead>
                  <TableHead className="text-[#704923]">Price</TableHead>
                  <TableHead className="text-[#704923]">Active Licenses</TableHead>
                  <TableHead className="text-right text-[#704923]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPackages.map((pkg) => (
                  <TableRow key={pkg.id} className="hover-[#FAF6F1]">
                    <TableCell className="font-medium text-[#5A3A1C]">{pkg.name}</TableCell>
                    <TableCell className="text-[#8B5A2B]">
                      {mockServices.find(s => s.id === pkg.serviceId)?.name || ""}
                    </TableCell>
                    <TableCell className="text-[#8B5A2B]">{pkg.duration}</TableCell>
                    <TableCell className="text-[#8B5A2B]">${pkg.price}</TableCell>
                    <TableCell className="text-[#8B5A2B]">{pkg.activeLicenses || 0}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        className="p-1 h-auto text-[#8B5A2B] hover-[#5A3A1C] hover-transparent"
                        onClick={() => handleEditPackage(pkg)}
                      >
                        <span className="material-icons text-sm">edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="p-1 h-auto text-[#8B5A2B] hover-[#5A3A1C] hover-transparent ml-2"
                      >
                        <span className="material-icons text-sm">more_vert</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-nunito font-semibold text-[#5A3A1C]">
              {editPackage ? "Edit Service Package" : "Add New Service Package"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Package Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="border-[#D2B48C] focus-[#A67C52]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Service</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[#D2B48C] focus-[#A67C52]">
                          <SelectValue placeholder="Select Service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockServices.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        className="border-[#D2B48C] focus-[#A67C52]" 
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#704923]">Duration</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[#D2B48C] focus-[#A67C52]">
                            <SelectValue placeholder="Select Duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1 Month">1 Month</SelectItem>
                          <SelectItem value="3 Months">3 Months</SelectItem>
                          <SelectItem value="6 Months">6 Months</SelectItem>
                          <SelectItem value="1 Year">1 Year</SelectItem>
                          <SelectItem value="2 Years">2 Years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#704923]">Price ($)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          step="0.01"
                          min="0"
                          className="border-[#D2B48C] focus-[#A67C52]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="flex justify-end gap-3 pt-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsFormOpen(false)}
                  className="border-[#D2B48C] text-[#704923] hover-[#FAF6F1]"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#8B5A2B] hover-[#704923]"
                >
                  {editPackage ? "Update Package" : "Create Package"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
