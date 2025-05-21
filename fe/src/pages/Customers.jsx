import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import axiosInstance from "../config/axiosInstance";
import { getItem } from "../config/storage";
import { queryClient } from "../lib/queryClient";

export default function Customers() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(null);
  const [formData, setFormData] = React.useState({
    customerId: null,
    username: "",
    password: "",
    name: "",
    createdByAdminId: getItem("adminId"),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateCustomerMutation = useMutation({
    mutationFn: async (payload) => {
      return await axiosInstance.put(`/api/customers/${payload.customerId}`, payload);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      setFormData({ username: "", password: "", name: "", createdByAdminId: getItem("adminId") });
      queryClient.invalidateQueries("customers");
    },
    onError: (error) => {
      console.error("Update failed:", error);
    }
  });



  const handleEditCustomer = (customer) => {
    setEditMode(true);
    console.log("Editing customer:", customer);
    setIsModalOpen(true);
    setFormData({
      customerId: customer.customerId,
      username: customer.username,
      password: "", // Keep empty for security, let user re-enter
      name: customer.name,
      createdByAdminId: customer.createdByAdminId,
    });
  };



  const { data: customers, isLoading, error } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/customers", {
        params: {
          search: searchQuery,
        },
      });
      return response.data;
    },
  });

  const addNewCustomerMutation = useMutation({
    mutationFn: async (payload) => {
      return await axiosInstance.post("/api/customers", payload);
    },
    onSuccess: () => {
      setIsModalOpen(false); // close modal
      setFormData({
        username: "",
        password: "",
        name: "",
        createdByAdminId: getItem("adminId"),
      });
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      console.error("Add failed:", error);
    }
  });

  const handleSearch = (e) => {
  e.preventDefault();
  queryClient.invalidateQueries(["customers", searchQuery]); // Refresh query results
};


  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#3D2815]">Customers</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse flex flex-col space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#3D2815]">Customers</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-red-500">Error loading customers. Please try again later.</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#3D2815]">Customers</h1>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#8B5A2B] hover-[#704923]">
          <span className="material-icons mr-2 text-sm">add</span>
          Add Customer
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Search Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search by name or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button type="submit" className="bg-[#8B5A2B] hover-[#704923]">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers?.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.username}</TableCell>
                  <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
                      <span className="material-icons">visibility</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditCustomer(customer)} className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
                      <span className="material-icons">edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
                      <span className="material-icons">delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {customers?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No customers found
                  </TableCell>
                </TableRow>
              )}- b
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

        <DialogContent className="z-50 rounded-lg bg-[#F5EAD8] border border-[#D2B48C] shadow-xl text-[#3D2815]">
          <DialogTitle className="text-xl font-bold text-[#5A3A1C]">
            {editMode ? "Edit" : "Add"}
          </DialogTitle>

          <div className="mt-4 space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-[#3D2815]">
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              className="border-[#D2B48C] bg-white text-[#3D2815] placeholder:text-[#A79277] focus:ring-[#8B5A2B]"
            />
          </div>

          <div className="mt-4 space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-[#3D2815]">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="border-[#D2B48C] bg-white text-[#3D2815] placeholder:text-[#A79277] focus:ring-[#8B5A2B]"
            />
          </div>

          <div className="mt-4 space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-[#3D2815]">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="border-[#D2B48C] bg-white text-[#3D2815] placeholder:text-[#A79277] focus:ring-[#8B5A2B]"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <DialogClose asChild>
              <Button className="bg-gray-300 text-[#3D2815] hover:bg-gray-400">Cancel</Button>
            </DialogClose>

            <Button
              onClick={() => {
                if (formData.username.trim() && formData.name.trim()) {
                  if (editMode) {
                    updateCustomerMutation.mutate(formData); // Edit existing customer
                  } else {
                    addNewCustomerMutation.mutate(formData); // Add new customer
                  }
                }
              }}
              className="bg-[#8B5A2B] hover:bg-[#704923] text-white"
            >
              {editMode ? "Update" : "Save"}
            </Button>

          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}