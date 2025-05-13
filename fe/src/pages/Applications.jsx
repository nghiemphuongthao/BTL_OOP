import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

export default function Applications() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/applications"],
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#3D2815]">Applications</h1>
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
          <h1 className="text-2xl font-semibold text-[#3D2815]">Applications</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-red-500">Error loading applications. Please try again later.</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#3D2815]">Applications</h1>
        <Button className="bg-[#8B5A2B] hover-[#704923]">
          <span className="material-icons mr-2 text-sm">add</span>
          Add Application
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>All Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Packages</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications?.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.name}</TableCell>
                  <TableCell>{application.packageCount || 0}</TableCell>
                  <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
                      <span className="material-icons">edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
                      <span className="material-icons">delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {applications?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No applications found
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