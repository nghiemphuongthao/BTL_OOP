import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export default function Licenses() {
  const [statusFilter, setStatusFilter] = React.useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/licenses", statusFilter], // Added statusFilter to the query key to make it dynamic
    queryFn: async () => {
      const response = await fetch(`/api/licenses?status=${statusFilter}`);
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#3D2815]">License Management</h1>
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
          <h1 className="text-2xl font-semibold text-[#3D2815]">License Management</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-red-500">Error loading licenses. Please try again later.</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#3D2815]">License Management</h1>
        <Button className="bg-[#8B5A2B] hover-[#704923]">
          <span className="material-icons mr-2 text-sm">add</span>
          Create License
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Filter Licenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="w-[240px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>All Licenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Activated</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((license) => (
                <TableRow key={license.id}>
                  <TableCell className="font-medium">{license.licenseCode}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        license.status === "active"
                          ? "bg-green-100 text-green-800"
                          : license.status === "inactive"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {license.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {license.activeAt
                      ? new Date(license.activeAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {license.expAt
                      ? new Date(license.expAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]"
                    >
                      <span className="material-icons">edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]"
                    >
                      <span className="material-icons">content_copy</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]"
                    >
                      <span className="material-icons">delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {data?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No licenses found
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
