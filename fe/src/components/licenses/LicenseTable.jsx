import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function LicenseTable({ licenses, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = licenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(licenses.length / itemsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case "expiring_soon":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Expiring Soon</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Suspended</Badge>;
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Expired</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-8 slide-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-nunito font-semibold text-[#5A3A1C]">License Management</h3>

        <div className="flex space-x-2">
          <Button className="flex items-center bg-[#8B5A2B] hover:bg-[#704923] text-white">
            <span className="material-icons text-sm mr-1">add</span>
            <span>Add License</span>
          </Button>

          <Button variant="outline" className="border-[#D2B48C] text-[#704923] hover:bg-[#FAF6F1]">
            <span className="material-icons text-sm mr-1">filter_list</span>
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#FAF6F1]">
            <TableRow>
              <TableHead className="text-[#704923]">License ID</TableHead>
              <TableHead className="text-[#704923]">Enterprise</TableHead>
              <TableHead className="text-[#704923]">Service Package</TableHead>
              <TableHead className="text-[#704923]">Status</TableHead>
              <TableHead className="text-[#704923]">Expiration Date</TableHead>
              <TableHead className="text-right text-[#704923]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((license) => (
              <TableRow key={license.id} className="hover:bg-[#FAF6F1]">
                <TableCell className="font-medium text-[#5A3A1C]">{license.licenseId}</TableCell>
                <TableCell className="text-[#8B5A2B]">{license.enterpriseName}</TableCell>
                <TableCell className="text-[#8B5A2B]">{license.packageName}</TableCell>
                <TableCell>{getStatusBadge(license.status)}</TableCell>
                <TableCell className="text-[#8B5A2B]">{license.expirationDate}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="p-1 h-auto text-[#8B5A2B] hover:text-[#5A3A1C]"
                    onClick={() => onEdit(license)}
                  >
                    <span className="material-icons text-sm">edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="p-1 h-auto text-[#8B5A2B] hover:text-[#5A3A1C] ml-2"
                  >
                    <span className="material-icons text-sm">more_vert</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-[#704923]">
          Showing <span className="font-medium">{currentItems.length}</span> of{" "}
          <span className="font-medium">{licenses.length}</span> licenses
        </div>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            className="border-[#D2B48C] text-[#704923] hover:bg-[#FAF6F1]"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              className={
                page === currentPage
                  ? "bg-[#8B5A2B] text-white hover:bg-[#704923]"
                  : "border-[#D2B48C] text-[#704923] hover:bg-[#FAF6F1]"
              }
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            className="border-[#D2B48C] text-[#704923] hover:bg-[#FAF6F1]"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
