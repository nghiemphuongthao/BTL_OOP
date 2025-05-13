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
import { mockEnterprises } from "../lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  taxId: z.string().min(5, "Tax ID must be at least 5 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(5, "Phone must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  contactPerson: z.string().min(2, "Contact person must be at least 2 characters"),
});

export default function Enterprises() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editEnterprise, setEditEnterprise] = useState<any | null>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      taxId: "",
      email: "",
      phone: "",
      address: "",
      contactPerson: "",
    },
  });

  const handleNewEnterprise = () => {
    form.reset({
      name: "",
      taxId: "",
      email: "",
      phone: "",
      address: "",
      contactPerson: "",
    });
    setEditEnterprise(null);
    setIsFormOpen(true);
  };

  const handleEditEnterprise = (enterprise) => {
    form.reset({
      name: enterprise.name,
      taxId: enterprise.taxId || "",
      email: enterprise.email || "",
      phone: enterprise.phone || "",
      address: enterprise.address || "",
      contactPerson: enterprise.contactPerson || "",
    });
    setEditEnterprise(enterprise);
    setIsFormOpen(true);
  };

  const onSubmit = (values) => {
    const operation = editEnterprise ? "updated" : "created";
    
    toast({
      title: `Enterprise ${operation}`,
      description: `Enterprise "${values.name}" has been successfully ${operation}.`,
      variant: "default",
    });
    
    setIsFormOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-nunito font-bold text-[#5A3A1C]">Enterprises</h2>
        <Button 
          className="bg-[#8B5A2B] hover-[#704923] flex items-center"
          onClick={handleNewEnterprise}
        >
          <span className="material-icons text-sm mr-2">add</span>
          <span>Add Enterprise</span>
        </Button>
      </div>

      <Card className="mb-6 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-nunito text-[#5A3A1C]">Enterprise Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Input 
                placeholder="Search enterprises..." 
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
                  <TableHead className="text-[#704923]">Enterprise Name</TableHead>
                  <TableHead className="text-[#704923]">Tax ID</TableHead>
                  <TableHead className="text-[#704923]">Contact Person</TableHead>
                  <TableHead className="text-[#704923]">Email</TableHead>
                  <TableHead className="text-[#704923]">Phone</TableHead>
                  <TableHead className="text-[#704923]">Licenses</TableHead>
                  <TableHead className="text-right text-[#704923]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEnterprises.map((enterprise) => (
                  <TableRow key={enterprise.id} className="hover-[#FAF6F1]">
                    <TableCell className="font-medium text-[#5A3A1C]">{enterprise.name}</TableCell>
                    <TableCell className="text-[#8B5A2B]">{enterprise.taxId}</TableCell>
                    <TableCell className="text-[#8B5A2B]">{enterprise.contactPerson}</TableCell>
                    <TableCell className="text-[#8B5A2B]">{enterprise.email}</TableCell>
                    <TableCell className="text-[#8B5A2B]">{enterprise.phone}</TableCell>
                    <TableCell className="text-[#8B5A2B]">{enterprise.licenseCount}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        className="p-1 h-auto text-[#8B5A2B] hover-[#5A3A1C] hover-transparent"
                        onClick={() => handleEditEnterprise(enterprise)}
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
              {editEnterprise ? "Edit Enterprise" : "Add New Enterprise"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Enterprise Name</FormLabel>
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
                name="taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Tax ID</FormLabel>
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

              <div className="grid grid-cols-1 md-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#704923]">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          className="border-[#D2B48C] focus-[#A67C52]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#704923]">Phone</FormLabel>
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
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Address</FormLabel>
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
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Contact Person</FormLabel>
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
                  {editEnterprise ? "Update Enterprise" : "Create Enterprise"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
