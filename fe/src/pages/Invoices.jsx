import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import axiosInstance from "../config/axiosInstance";
import { getItem } from "../config/storage";
import { queryClient } from "../lib/queryClient";

export default function Invoices() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const [formData, setFormData] = React.useState({
    invoiceId: null,
    invoiceNumber: "",
    date: "",
    amount: "",
    createdByAdminId: getItem("adminId"),
    customerId: "",
    status: 1,
    invoiceDetailIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "status" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      createdAt: new Date(formData.date),
    };
    if (editMode) {
      updateInvoiceMutation.mutate(payload);
    } else {
      addNewInvoiceMutation.mutate(payload);
    }
  };

  const updateInvoiceMutation = useMutation({
    mutationFn: async (payload) => {
      return await axiosInstance.put(`/api/invoices/${payload.invoiceId}`, payload);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      resetFormData();
      queryClient.invalidateQueries(["invoices"]);
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
      customerId: invoice.customerId,
      status: invoice.status,
      invoiceDetailIds: invoice.invoiceDetailIds || [],
    });
  };

  const resetFormData = () => {
    setFormData({
      invoiceNumber: "",
      date: "",
      amount: "",
      createdByAdminId: getItem("adminId"),
      customerId: "",
      status: 1,
      invoiceDetailIds: [],
    });
    setEditMode(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#3D2815]">Invoices</h1>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#8B5A2B] hover:bg-[#704923]">
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
            <Button type="submit" className="bg-[#8B5A2B] hover:bg-[#704923]">
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
                <TableHead>Customer ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices?.map((invoice) => (
                <TableRow key={invoice.invoiceId}>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{invoice.customerId}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditInvoice(invoice)} className="text-[#8B5A2B] hover:bg-[#F5EAD8]">
                      <span className="material-icons">edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium">Invoice Number</label>
              <Input name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} required />
            </div>

            <div>
              <label className="text-sm font-medium">Date</label>
              <Input name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input name="amount" type="number" value={formData.amount} onChange={handleChange} required />
            </div>

            <div>
              <label className="text-sm font-medium">Customer ID</label>
              <Input name="customerId" type="number" value={formData.customerId} onChange={handleChange} required />
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <Input name="status" type="number" value={formData.status} onChange={handleChange} required />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-[#A79277] hover:bg-[#704923]">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#8B5A2B] hover:bg-[#704923]">
                {editMode ? "Update" : "Add"} Invoice
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
