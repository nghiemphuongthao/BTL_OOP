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
import { Badge } from "../components/ui/badge";
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
import { Textarea } from "../components/ui/textarea";
import { mockServices } from "../lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  apiEndpoint: z.string().optional(),
});


export default function Services() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editService, setEditService] = useState<any | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      apiEndpoint: "",
    },
  });

  const handleNewService = () => {
    form.reset({
      name: "",
      description: "",
      apiEndpoint: "",
    });
    setEditService(null);
    setIsFormOpen(true);
  };

  const handleEditService = (service) => {
    form.reset({
      name: service.name,
      description: service.description || "",
      apiEndpoint: service.apiEndpoint || "",
    });
    setEditService(service);
    setIsFormOpen(true);
  };

  const onSubmit = (values) => {
    const operation = editService ? "updated" : "created";
    
    toast({
      title: `Service ${operation}`,
      description: `Service "${values.name}" has been successfully ${operation}.`,
      variant: "default",
    });
    
    setIsFormOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-nunito font-bold text-[#5A3A1C]">Services</h2>
        <Button 
          className="bg-[#8B5A2B] hover-[#704923] flex items-center"
          onClick={handleNewService}
        >
          <span className="material-icons text-sm mr-2">add</span>
          <span>Add Service</span>
        </Button>
      </div>

      <Card className="mb-6 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-nunito text-[#5A3A1C]">Service Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Input 
                placeholder="Search services..." 
                className="pl-8 border-[#D2B48C] focus-[#A67C52]"
              />
              <span className="material-icons absolute left-2 top-2.5 text-[#C19A6B] text-sm">search</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-[#D2B48C] text-[#704923] hover-[#FAF6F1]">
                <span className="material-icons text-sm mr-1">filter_list</span>
                <span>Filter</span>
              </Button>
              <Button variant="outline" className="border-[#D2B48C] text-[#704923] hover-[#FAF6F1]">
                <span className="material-icons text-sm mr-1">sort</span>
                <span>Sort</span>
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#FAF6F1]">
                <TableRow>
                  <TableHead className="text-[#704923]">Service Name</TableHead>
                  <TableHead className="text-[#704923]">Description</TableHead>
                  <TableHead className="text-[#704923]">Total Packages</TableHead>
                  <TableHead className="text-[#704923]">Status</TableHead>
                  <TableHead className="text-right text-[#704923]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockServices.map((service) => (
                  <TableRow key={service.id} className="hover-[#FAF6F1]">
                    <TableCell className="font-medium text-[#5A3A1C]">{service.name}</TableCell>
                    <TableCell className="text-[#8B5A2B]">{service.description}</TableCell>
                    <TableCell className="text-[#8B5A2B]">{service.packageCount}</TableCell>
                    <TableCell>
                      <Badge className={
                        service.status === "active" 
                          ? "bg-green-100 text-green-800 hover-green-100" 
                          : "bg-yellow-100 text-yellow-800 hover-yellow-100"
                      }>
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        className="p-1 h-auto text-[#8B5A2B] hover-[#5A3A1C] hover-transparent"
                        onClick={() => handleEditService(service)}
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
              {editService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Service Name</FormLabel>
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

              <FormField
                control={form.control}
                name="apiEndpoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">API Endpoint (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="border-[#D2B48C] focus-[#A67C52]" 
                        placeholder="e.g., /api/services/verify"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  {editService ? "Update Service" : "Create Service"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
