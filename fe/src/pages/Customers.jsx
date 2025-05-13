import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/input";

export default function Customers() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/customers"], 
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // The query will be refreshed automatically due to the queryKey change
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
        <Button className="bg-[#8B5A2B] hover-[#704923]">
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
                    <Button variant="ghost" size="icon" className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
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
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}