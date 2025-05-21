import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import axiosInstance from "../config/axiosInstance";

export default function Dashboard() {
  const {
    data: applications,
    isLoading: loadingApps,
    error,
  } = useQuery({
    queryKey: ["application"],
    queryFn: async () => {
      console.log("Fetching applications...");
      const response = await axiosInstance.get("/api/application");
      return response.data;
    },
  });

  const {
    data: customers,
    isLoading: loadingCustomers,
    error: customersError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      console.log("Fetching customers...");
      const response = await axiosInstance.get("/api/customers");
      return response.data;
    },
  });

   useEffect(() => {
    if (error) console.error("React Query Error:", error);
  }, [error]);



  const isLoading = loadingApps;


  useEffect(() => {
    console.log('Applications:');
  },)

  if (loadingApps) {
    return <div>Loading applications...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-[#3D2815] mb-6">Dashboard</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* <Card className="bg-[#F5EAD8]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#704923]">
              Total Licenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#3D2815]">
              {isLoading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
              ) : (
                licenses?.length || 0
              )}
            </div>
            <p className="text-xs text-[#8B5A2B] mt-1">Active licenses in the system</p>
          </CardContent>
        </Card> */}

        <Card className="bg-[#F5EAD8]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#704923]">
              Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#3D2815]">
              {isLoading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
              ) : (
                applications?.length || 0
              )}
            </div>
            <p className="text-xs text-[#8B5A2B] mt-1">Registered applications</p>
          </CardContent>
        </Card>

         <Card className="bg-[#F5EAD8]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#704923]">
              Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#3D2815]">
              {isLoading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
              ) : (
                customers?.length || 0
              )}
            </div>
            <p className="text-xs text-[#8B5A2B] mt-1">Registered customers</p>
          </CardContent>
        </Card>

        {/* <Card className="bg-[#F5EAD8]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#704923]">
              Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#3D2815]">
              {isLoading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
              ) : (
                invoices?.length || 0
              )}
            </div>
            <p className="text-xs text-[#8B5A2B] mt-1">Total invoices created</p>
          </CardContent>
        </Card>  */}
      </div>

      {/* Recent Licenses */}
      {/* <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Licenses</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Activated</TableHead>
                  <TableHead>Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenses?.slice(0, 5).map((license) => (
                  <TableRow key={license.id}>
                    <TableCell className="font-medium">{license.licenseCode}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${license.status === "active"
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
                      {license.expAt ? new Date(license.expAt).toLocaleDateString() : "-"}
                    </TableCell>
                  </TableRow>
                ))}
                {licenses?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      No licenses found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card> */}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:bg-[#F5EAD8] transition-colors">
              <CardContent className="p-6 flex flex-col items-center">
                <span className="material-icons text-4xl text-[#8B5A2B] mb-2">verified_user</span>
                <h3 className="font-medium text-[#3D2815]">Create License</h3>
                <p className="text-xs text-[#8B5A2B] text-center mt-1">
                  Generate a new license key for customers
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-[#F5EAD8] transition-colors">
              <CardContent className="p-6 flex flex-col items-center">
                <span className="material-icons text-4xl text-[#8B5A2B] mb-2">people</span>
                <h3 className="font-medium text-[#3D2815]">Add Customer</h3>
                <p className="text-xs text-[#8B5A2B] text-center mt-1">
                  Register a new customer in the system
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-[#F5EAD8] transition-colors">
              <CardContent className="p-6 flex flex-col items-center">
                <span className="material-icons text-4xl text-[#8B5A2B] mb-2">receipt</span>
                <h3 className="font-medium text-[#3D2815]">Create Invoice</h3>
                <p className="text-xs text-[#8B5A2B] text-center mt-1">
                  Generate a new invoice for a customer
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
