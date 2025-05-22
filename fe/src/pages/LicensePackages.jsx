import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader
} from "../components/ui/dialog";
import { queryClient } from "../lib/queryClient";

const LicensePackages = () => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    licensePackageId: null,
    name: "",
    code: "",
    applicationId: "",
    expirationMonths: "",
  });

  const { data: licensePackages } = useQuery({
    queryKey: ["license-packages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/license-packages");
      return res.data;
    },
  });

  const { data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/applications");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (data.licensePackageId) {
        return await axiosInstance.put(`/api/license-packages/${data.licensePackageId}`, data);
      } else {
        return await axiosInstance.post("/api/license-packages", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["license-packages"]);
      setOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      expirationMonths: parseInt(formData.expirationMonths),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (pkg) => {
    setFormData({
      licensePackageId: pkg.licensePackageId,
      name: pkg.name,
      code: pkg.code,
      applicationId: pkg.application?.applicationId || "",
      expirationMonths: pkg.expirationMonths,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/api/license-packages/${id}`);
    queryClient.invalidateQueries(["license-packages"]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold text-[#3D2815]">License Packages</h1>
        <Button onClick={() => { setFormData({ licensePackageId: null, name: "", code: "", applicationId: "", expirationMonths: "" }); setOpen(true); }}>
          Add Package
        </Button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Code</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Application</th>
            <th className="py-2 px-4 border">Expiration Months</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {licensePackages?.map((pkg) => (
            <tr key={pkg.licensePackageId}>
              <td className="py-2 px-4 border">{pkg.code}</td>
              <td className="py-2 px-4 border">{pkg.name}</td>
              <td className="py-2 px-4 border">{pkg.application?.applicationName}</td>
              <td className="py-2 px-4 border">{pkg.expirationMonths}</td>
              <td className="py-2 px-4 border space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(pkg)} className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
                      <span className="material-icons">edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(pkg.licensePackageId)} className="text-[#8B5A2B] hover-[#704923] hover-[#F5EAD8]">
                      <span className="material-icons">delete</span>
                    </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="z-50 rounded-lg bg-[#F5EAD8] border border-[#D2B48C] shadow-xl text-[#3D2815]">
          <DialogHeader>
            <DialogTitle>{formData.licensePackageId ? "Edit Package" : "Add Package"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-[#3D2815]">Code</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full border border-[#D2B48C] rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#3D2815]">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#D2B48C] rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="expirationMonths" className="block text-sm font-medium text-[#3D2815]">Expiration Months</label>
              <input
                type="number"
                id="expirationMonths"
                name="expirationMonths"
                value={formData.expirationMonths}
                onChange={handleChange}
                className="w-full border border-[#D2B48C] rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="applicationId" className="block text-sm font-medium text-[#3D2815]">Application</label>
              <select
                id="applicationId"
                name="applicationId"
                value={formData.applicationId}
                onChange={handleChange}
                className="w-full border border-[#D2B48C] rounded p-2"
                required
              >
                <option value="">-- Select Application --</option>
                {applications?.map(app => (
                  <option key={app.applicationId} value={app.applicationId}>{app.applicationName}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <Button type="submit">{formData.licensePackageId ? "Update" : "Create"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LicensePackages;
