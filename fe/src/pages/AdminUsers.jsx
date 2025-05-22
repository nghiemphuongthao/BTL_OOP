import React from "react";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "../components/ui/form";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "../components/ui/dialog";

export default function AdminPermissionsForm({ form, setIsFormOpen, editAdmin }) {
  const onSubmit = async (values) => {
    try {
      if (editAdmin) {
        // PUT request to update an existing admin
        await axios.put(`/api/admin/${editAdmin.id}`, values);
      } else {
        // POST request to create a new admin
        await axios.post("/api/admin", values);
      }
      setIsFormOpen(false); // Close form on success
    } catch (error) {
      console.error("Error saving admin:", error);
      // Optionally show user feedback here
    }
  };

  return (
    <div>
      <Dialog open={true} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-[#8B5A2B]"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-[#704923]">
                        Active Account
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <h3 className="text-md font-nunito font-semibold text-[#5A3A1C]">Permissions</h3>
                <div className="rounded-md border border-[#E6D5B8] p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-2 border-b border-[#E6D5B8] pb-2">
                    <div className="font-medium text-[#5A3A1C]">Module</div>
                    <div className="font-medium text-[#5A3A1C]">Read</div>
                    <div className="font-medium text-[#5A3A1C]">Read & Write</div>
                  </div>

                  {["licenses", "enterprises", "services", "packages", "admins"].map((module) => (
                    <div key={module} className="grid grid-cols-3 gap-2 items-center">
                      <div className="text-[#704923]">
                        {{
                          licenses: "License Management",
                          enterprises: "Enterprises",
                          services: "Services",
                          packages: "Service Packages",
                          admins: "Admin Users",
                        }[module]}
                      </div>

                      <FormField
                        control={form.control}
                        name={`permissions.${module}.read`}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-[#8B5A2B]"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`permissions.${module}.write`}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-[#8B5A2B]"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter className="flex justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                  className="border-[#D2B48C] text-[#704923] hover:bg-[#FAF6F1]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#8B5A2B] hover:bg-[#704923]"
                >
                  {editAdmin ? "Update Admin" : "Create Admin"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
