import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";
import axiosInstance from "../config/axiosInstance";
import { Input } from "../components/ui/input";
import { queryClient } from "../lib/queryClient";

export default function Applications() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [editApp, setEditApp] = React.useState(null); // application object or null


  const {
    data: applications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["application"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/application");
      console.log("Applications:", response.data);
      return response.data;
    },
  });

  const addApplicationMutation = useMutation({
    mutationFn: async (newApp) => {
      return await axiosInstance.post("/api/application", newApp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["application"]);
      setIsModalOpen(false); // close modal
      setName(""); // reset input
    },
    onError: (error) => {
      console.error("Add failed:", error);
    }
  });


  const updateMutation = useMutation({
    mutationFn: async ({ id, name }) => {
      return await axiosInstance.put(`/api/application/${id}`, { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["application"]);
      setEditApp(null); // close modal
      setName("");
      setIsModalOpen(false); // close modal
    },
    onError: (err) => console.error("Update failed", err),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/api/application/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["application"]);
    },
    onError: (err) => console.error("Delete failed", err),
  });

  useEffect(() => {
    if (error) console.error("React Query Error:", error);
  }, [error]);

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
            <div className="text-red-500">
              Error loading applications. Please try again later.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#3D2815]">Applications</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#8B5A2B] hover:bg-[#704923]"
        >
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
                  <TableCell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#8B5A2B] hover:bg-[#F5EAD8]"
                      onClick={() => {
                        setEditApp(application);
                        setName(application.name);
                        setIsModalOpen(true);
                      }}
                    >
                      <span className="material-icons">edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#8B5A2B] hover:bg-[#F5EAD8]"
                      onClick={() => deleteMutation.mutate(application.applicationId)}
                    >
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

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

        <DialogContent className="z-50 rounded-lg bg-[#F5EAD8] border border-[#D2B48C] shadow-xl text-[#3D2815]">
          <DialogTitle className="text-xl font-bold text-[#5A3A1C]">
            {editApp ? "Edit Application" : "Add Application"}
          </DialogTitle>

          <div className="mt-4 space-y-2">
            <label htmlFor="appName" className="text-sm font-medium text-[#3D2815]">
              Application Name
            </label>
            <Input
              id="appName"
              type="text"
              placeholder="Enter application name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[#D2B48C] bg-white text-[#3D2815] placeholder:text-[#A79277] focus:ring-[#8B5A2B]"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <DialogClose asChild>
              <Button className="bg-gray-300 text-[#3D2815] hover:bg-gray-400">Cancel</Button>
            </DialogClose>

            {
              !editApp ? (
                <Button
                  onClick={() => {
                    if (name.trim()) {
                      addApplicationMutation.mutate({ name });
                    }
                  }}
                  className="bg-[#8B5A2B] hover:bg-[#704923] text-white"
                  disabled={addApplicationMutation.isLoading}
                >
                  {addApplicationMutation.isLoading ? "Saving..." : "Save"}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (name.trim()) {
                      updateMutation.mutate({ id: editApp.applicationId, name });
                    }
                  }}
                  className="bg-[#8B5A2B] hover:bg-[#704923] text-white"
                >
                  {updateMutation.isLoading ? "Saving..." : "Save"}
                </Button>
              )
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
