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

export default function Invoices() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false); // false for adding, true for editing
  const [formData, setFormData] = React.useState({
    invoiceId: null,
    invoiceNumber: "",
    date: "",
    amount: "",
    createdByAdminId: getItem("adminId"),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateInvoiceMutation = useMutation({
    mutationFn: async (payload) => {
      return await axiosInstance.put(`/api/invoices/${payload.invoiceId}`, payload);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      resetFormData();
      queryClient.invalidateQueries("invoices");
    },
    onError: (error) => {
      console.error("Update failed:", error);
    }
  });

  const addNewInvoiceMutation = useMutation({
    mutationFn: async (payload) => {
      return await axiosInstance.post("/api/invoices", payload);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      resetFormData();
      queryClient.invalidateQueries(["invoices"]);
    },
    onError: (error) => {
      console.error("Add failed:", error);
    }
  });

  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ["invoices", searchQuery],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/invoices", {
        params: {
          search: searchQuery,
        },
      });
      return response.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    queryClient.invalidateQueries(["invoices", searchQuery]);
  };

  const handleEditInvoice = (invoice) => {
    setEditMode(true);
    setIsModalOpen(true);
    setFormData({
      invoiceId: invoice.invoiceId,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.date,
      amount: invoice.amount,
      createdByAdminId: invoice.createdByAdminId,
    });
  };

  const resetFormData = () => {
    setFormData({
      invoiceNumber: "",
      date: "",
      amount: "",
      createdByAdminId: getItem("adminId"),
    });
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#3D2815]">Invoices</h1>
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
          <h1 className="text-2xl font-semibold text-[#3D2815]">Invoices</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-red-500">Error loading invoices. Please try again later.</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#3D2815]">Invoices</h1>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#8B5A2B] hover-[#704923]">
          <span className="material-icons mr-2 text-sm">add</span>
          Add Invoice
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Search Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search by invoice number or amount..."
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
          <CardTitle>All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices?.map((invoice) => (
                <TableRow key={invoice.invoiceId}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
                      <span className="material-icons">visibility</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditInvoice(invoice)} className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
                      <span className="material-icons">edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
                      <span className="material-icons">delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {invoices?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No invoices found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="z-50 rounded-lg bg-[#F5EAD8] border border-[#D2B48C] shadow-xl text-[#3D2815]">
          <DialogTitle className="text-xl font-bold text-[#5A3A1C]">
            {editMode ? "Edit" : "Add"} Invoice
          </DialogTitle>

          <div className="mt-4 space-y-2">
            <label htmlFor="invoiceNumber" className="text-sm font-medium text-[#3D2815]">
              Invoice Number
            </label>
            <Input
              id="invoiceNumber"
              name="invoiceNumber"
              type="text"
              placeholder="Enter Invoice Number"
              value={formData.invoiceNumber}
              onChange={handleChange}
              className="border-[#D2B48C] bg-white text-[#3D2815] placeholder:text-[#A79277] focus:ring-[#8B5A2B]"
            />
          </div>

          <div className="mt-4 space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-[#3D2815]">
              Date
            </label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="border-[#D2B48C] bg-white text-[#3D2815] placeholder:text-[#A79277] focus:ring-[#8B5A2B]"
            />
          </div>

          <div className="mt-4 space-y-2">
            <label htmlFor="amount" className="text-sm font-medium text-[#3D2815]">
              Amount
            </label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              className="border-[#D2B48C] bg-white text-[#3D2815] placeholder:text-[#A79277] focus:ring-[#8B5A2B]"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={() => setIsModalOpen(false)} className="bg-[#A79277] hover-[#704923]">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editMode) {
                  updateInvoiceMutation.mutate(formData);
                } else {
                  addNewInvoiceMutation.mutate(formData);
                }
              }}
              className="bg-[#8B5A2B] hover-[#704923]"
            >
              {editMode ? "Update" : "Add"} Invoice
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
