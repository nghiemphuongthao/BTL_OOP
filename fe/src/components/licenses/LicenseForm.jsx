import React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

export default function LicenseForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  enterprises = [],
  services = [],
  packages = [],
}) {
  function generateLicenseId() {
    const year = new Date().getFullYear();
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `LIC-${year}-${randomPart}`;
  }

  function addOneYear(date) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }

  const form = useForm({
    defaultValues: {
      enterpriseId: initialData?.enterpriseId || 0,
      serviceId: initialData?.serviceId || 0,
      packageId: initialData?.packageId || 0,
      licenseId: initialData?.licenseId || generateLicenseId(),
      startDate: initialData?.startDate || format(new Date(), "yyyy-MM-dd"),
      endDate: initialData?.endDate || format(addOneYear(new Date()), "yyyy-MM-dd"),
      active: initialData?.active ?? true,
      notes: initialData?.notes || "",
    },
  });

  const selectedServiceId = form.watch("serviceId");

  const filteredPackages = packages.filter(
    (pkg) => pkg.serviceId === Number(selectedServiceId) || selectedServiceId === 0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-nunito font-semibold text-[#5A3A1C]">
            {initialData ? "Edit License" : "Add New License"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="enterpriseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Enterprise</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[#D2B48C] focus-[#A67C52]">
                          <SelectValue placeholder="Select Enterprise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {enterprises.map((enterprise) => (
                          <SelectItem
                            key={enterprise.id}
                            value={enterprise.id.toString()}
                          >
                            {enterprise.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Service</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                        form.setValue("packageId", 0);
                      }}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[#D2B48C] focus-[#A67C52]">
                          <SelectValue placeholder="Select Service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem
                            key={service.id}
                            value={service.id.toString()}
                          >
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="packageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Service Package</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                      disabled={!selectedServiceId || selectedServiceId === 0}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[#D2B48C] focus-[#A67C52]">
                          <SelectValue placeholder="Select Package" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredPackages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id.toString()}>
                            {pkg.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="licenseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">License ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly
                        className="bg-[#FAF6F1] border-[#D2B48C] focus-[#A67C52]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Start Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="border-[#D2B48C] focus-[#A67C52]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#704923]">Expiration Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="border-[#D2B48C] focus-[#A67C52]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#704923]">Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="border-[#D2B48C] focus-[#A67C52]"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]-[#8B5A2B]"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-[#704923]">
                      Activate license immediately
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-3 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-[#D2B48C] text-[#704923] hover-[#FAF6F1]"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#8B5A2B] hover-[#704923]">
                {initialData ? "Update License" : "Create License"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
